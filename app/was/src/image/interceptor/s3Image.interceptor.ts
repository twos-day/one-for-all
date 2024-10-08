import { S3Client } from '@aws-sdk/client-s3';
import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { extname } from 'path';
import { tap } from 'rxjs/operators';
import { AwsService } from 'src/aws/aws.service';
import { v4 as uuid } from 'uuid';
import { ImageService } from '../image.service';

const multerOptions: multer.Options = {
  limits: {
    fieldSize: 10000000, //바이트 단위로 입력
  },
  fileFilter: (req, file, cb) => {
    // cb(에러, 저장여부/boolean)
    const ext = extname(file.originalname); //확장자 추출
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(
        new BadRequestException('jpg/jpeg/png 파일만 업로드 가능합니다.'),
      );
    }

    return cb(null, true);
  },
};

@Injectable()
export class S3ImageInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsService: AwsService,
    private readonly imageService: ImageService,
  ) {}

  get uploader(): RequestHandler {
    multerOptions.storage = multerS3({
      s3: this.awsService.s3Client,
      bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      key: function (request, file, cb) {
        const fileName = uuid() + extname(file.originalname);
        cb(null, fileName);
      },
    });

    return multer(multerOptions).single('image');
  }

  upload(request: any, response: any) {
    return new Promise((resolve, reject) => {
      this.uploader(request, response, (error: Error) => {
        return error ? reject(error) : resolve(request);
      });
    });
  }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const user = request.user;

    if (!user) {
      throw new BadRequestException('사용자 정보가 없습니다.');
    }

    await this.upload(request, response);

    if (!request.file) {
      throw new BadRequestException('이미지 파일이 없습니다.');
    }

    this.imageService.saveMetadata(user.email, request.file.key);

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `S3ImageInterceptor: S3-Bucket 이미지 저장성공. 유저 이메일: ${user.email}, 이미지 키: ${request.file.key}`,
          ),
        ),
      );
  }
}

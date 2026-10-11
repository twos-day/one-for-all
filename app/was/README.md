## 설계 문서

- [단일 WAS 기반 다중 서비스 설계](../../docs/architecture/multi-service-was.md): 서비스별 회원·인증·DB 분리, 디렉터리 구조 및 기존 코드 이관 계획

모듈추가시

```
nest g resource
```

DB 실행

```
docker desktop 실행
docker-compose up
```

DB 초기화

```
./postgres-data 폴더삭제
DB 재실행
```

실행순서
req => middleware => guard => interceptor => pipe
controller => service => repository
exceptionfilter => interceptor => res

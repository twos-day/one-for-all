import Content from "@/components/signup/Content";
import * as layout from "../layout.css";

export default function Page() {
  return (
    <>
      <h1 className={layout.title}>이메일 회원가입</h1>
      <Content />
    </>
  );
}

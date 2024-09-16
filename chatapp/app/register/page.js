import RegisterForm from "../../components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import LoginForm from "../../components/LoginForm"
export default async function Register() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center sm:p-24">
      <RegisterForm />
      {/* <LoginForm/> */}
    </div>
  );
}

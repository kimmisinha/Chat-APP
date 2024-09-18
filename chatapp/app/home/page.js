"use client";
// http://localhost:3000/home
import HomePage from "../../components/Homepage";
import { useSession } from "next-auth/react";
import ChatBox from "../../components/ChatBox";
import withAuth from "../../components/withAuth";
import LoginForm from "../../components/LoginForm";

const Home = () => {
  const { data: session, status } = useSession();
  // console.log(session);
  if (session) {
    switch (session.user.role) {
      case "admin":
        return <ChatBox />;
      case "user":
        return <HomePage />;
    }
  }
  // return (
  //   <div className="flex min-h-screen flex-col items-center justify-center sm:p-24">
  //     < LoginForm/>
  //   </div>

  // );
};

export default withAuth(Home);

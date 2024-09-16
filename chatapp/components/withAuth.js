"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return function WithAuth(props) {
    const { data: session } = useSession();

    useEffect(() => {
      if (!session) {
        redirect("/");
      }
    }, [session]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;


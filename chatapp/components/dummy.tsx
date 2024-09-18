"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const UserInfo: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page if there is no session
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-w-[300px] max-w-[350px] border-y-2 border-green-500 font-bold px-10 py-5 rounded-2xl shadow-xl space-y-5">
      <h1 className="font-extrabold text-center">Account:</h1>
      <div className="flex flex-col text-center gap-1">
        <div className="flex justify-center">
          <Image
            src={session?.user?.image ? session.user.image : "dummy.jpg"}
            alt="User Image"
            width={60}
            height={60}
            className="rounded-full mb-1"
            quality={100}
            unoptimized
          />
        </div>
        <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => signOut()}
          className="flex w-fit px-3 py-1 bg-red-500 text-white rounded-lg active:scale-95 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

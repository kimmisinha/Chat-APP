"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setFormData((prevData) => ({ ...prevData, error: "Form cannot be empty" }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormData((prevData) => ({ ...prevData, error: "Email invalid" }));
      return;
    }

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        setFormData((prevData) => ({ ...prevData, error: res.error }));
        return;
      } else if (res?.ok) {
        router.replace("/home");
      }
    } catch (error) {
      // console.log(error);
      setFormData((prevData) => ({ ...prevData, error: "An unexpected error occurred" }));
    }
  };

  return (
    <div className="sm:p-10 rounded-2xl">
      <div className="p-5 border-t-2 border-green-400 rounded-2xl shadow-2xl">
        <h1 className="text-xl font-bold mb-5 text-center">Login</h1>
        <form onSubmit={loginHandler} className="flex flex-col gap-3">
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="text"
            placeholder="Email"
            className="sm:w-[400px] border border-gray-200 px-6 py-2 bg-zinc-100/40 rounded-lg"
          />
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="Password"
            className="sm:w-[400px] border border-gray-200 px-6 py-2 bg-zinc-100/40 rounded-lg"
          />
          <button className="bg-green-400 px-6 py-2 text-white font-bold hover:bg-green-500 active:scale-95 rounded-lg transition-all">
            Login
          </button>
          {formData.error && (
            <div className="px-3 py-1 w-fit text-white text-sm bg-red-500 rounded-md">
              {formData.error}
            </div>
          )}
        </form>
        <div className="text-center font-bold my-4">Or</div>
        <div className="flex justify-center mt-4">
          <Link href={"/register"} className="text-sm">
            {`Don't have an account?`}{" "}
            <span className="underline">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

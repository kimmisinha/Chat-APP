"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const formRef = useRef(null);
  const router = useRouter(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Form cannot be empty",
      }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormData((prevData) => ({ ...prevData, error: "Email invalid" }));
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        if (formRef.current) {
          formRef.current.reset();
          setFormData({
            name: "",
            email: "",
            password: "",
            error: "Registration Success",
          });
        }
      } else {
        const data = await res.json();
        // console.log("User registration failed.", data.message);
        setFormData((prevData) => ({ ...prevData, error: data.message }));
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  useEffect(() => {
    if (formData.error === "Registration Success") {
      setTimeout(() => router.push("/login"), 1000); 
    }
  }, [formData.error, router]);

  return (
    <div className="sm:p-10 rounded-2xl">
      <div className="p-5 border-t-2 border-green-400 rounded-2xl shadow-2xl">
        <h1 className="text-xl font-bold mb-5 text-center">Register</h1>
        <form
          onSubmit={registerHandler}
          ref={formRef}
          className="flex flex-col gap-3"
        >
          <input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Full Name"
            className="sm:w-[400px] border border-gray-200 px-6 py-2 bg-zinc-100/40 rounded-lg"
          />
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
          <button
            type="submit"
            className="bg-green-400 px-6 py-2 text-white font-bold hover:bg-green-500 active:scale-95 rounded-lg transition-all"
          >
            Register
          </button>
          {formData.error && (
            <div
              className={`${
                formData.error === "Registration Success"
                  ? "bg-green-500"
                  : "bg-red-500"
              } px-3 py-1 w-fit text-white text-sm rounded-md`}
            >
              {formData.error === "Registration Success"
                ? "Registration Successful! Redirecting to login..."
                : formData.error}
            </div>
          )}
          { formData.error == "Registration Success" && (
            <div className="flex justify-center mt-4">
              <Link href="/login" className="text-sm text-right">
               
              </Link>
            </div>
          )}

          <div className="flex justify-center mt-4">
            <Link href={"/login"} className="text-sm text-right">
              {`Already have an account?`}{" "}
              <span className="underline">Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

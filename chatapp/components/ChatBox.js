"use client";

import React, { useState, useEffect, useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaEnvelope,
  FaYoutube,
  FaQuestionCircle,
  FaLightbulb,
} from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import io from "socket.io-client";

function ChatBox() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");

  const router = useRouter();
  const socket =io("http://localhost:3001")
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

 const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("Welcome", (s) => console.log(s));

    socket.on("user has joined", (message) => {
      console.log(message);
    });

    socket.on("receive-message", (data) => {
      console.log("data", data);
      socket.emit("receive-message", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center sm:p-2">
      <div className="flex min-h-screen bg-[#F3F4F6]">
        <div className="fixed left-4 z-50">
          <button onClick={toggleSidebar} className="p-4">
            <FaBars className="text-xl" />
          </button>
        </div>
        {isSidebarOpen && (
          <aside className="fixed left-0 top-0 bg-[#F3F4F6] h-full z-40 shadow-lg p-4">
            <h1 className="text-xl font-bold mb-6 mt-20 pl-4">Recent Chats</h1>
            <ul className="space-y-4 pl-4">
              <li className="flex items-center text-sm">
                <MdCheckBoxOutlineBlank className="mr-2" />
                Social Media Manager interview
              </li>
              <li className="flex items-center text-sm">
                <MdCheckBoxOutlineBlank className="mr-2" />
                Chat App with Next.js
              </li>
              <li className="flex items-center text-sm">
                <MdCheckBoxOutlineBlank className="mr-2" />
                Stress Relief Text
              </li>
              <button
                onClick={() => signOut()}
                className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm transition-transform transform hover:scale-95 mt-4"
              >
                Logout
              </button>
            </ul>
          </aside>
        )}
        <main className="flex-1 p-6 pl-12 pr-1 transition-all duration-300 flex flex-col items-center bg-white justify-start">
          <div className="text-center mb-10 mt-6">
            <h1 className="text-4xl font-bold text-blue-600">Hello, Gemini</h1>
            <p className="text-xl text-gray-600 mt-2">
              How can I help you today?
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#F3F4F6] p-4 shadow-lg rounded-lg h-40 w-48 flex flex-col justify-between items-center">
              <p className="text-center text-sm font-semibold">
                Show the most important emails in my inbox
              </p>
              <button className="p-2 bg-blue-600 text-white rounded">
                <FaEnvelope className="text-sm" />
              </button>
            </div>
            <div className="bg-[#F3F4F6] p-4 shadow-lg rounded-lg h-40 w-48 flex flex-col justify-between items-center">
              <p className="text-center text-sm font-semibold">
                Find YouTube videos with inspiring best man speeches
              </p>
              <button className="p-2 bg-red-600 text-white rounded">
                <FaYoutube className="text-sm" />
              </button>
            </div>
            <div className="bg-[#F3F4F6] p-4 shadow-lg rounded-lg h-40 w-48 flex flex-col justify-between items-center">
              <p className="text-center text-sm font-semibold">
                Provide questions to help me prepare for an interview
              </p>
              <button className="p-2 bg-green-600 text-white rounded justify-end">
                <FaQuestionCircle className="text-sm" />
              </button>
            </div>
            <div className="bg-[#F3F4F6] p-4 shadow-lg rounded-lg h-40 w-48 flex flex-col justify-between items-center">
              <p className="text-center text-sm font-semibold">
                Come up with a product name for a new app
              </p>
              <button className="p-2 bg-yellow-600 text-white rounded">
                <FaLightbulb className="text-sm" />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-[260px]">
              <input
                type="text"
                placeholder="Enter text to search..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-[820px] bg-[#F3F4F6]"
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="m-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="text-gray-500 text-center mt-[10px]">
            <p>
              Gemini may display inaccurate info, so double-check its responses.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChatBox;

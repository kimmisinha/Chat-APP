import React from "react";
import { signOut } from "next-auth/react"; 


function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      <h1 className="text-4xl font-extrabold text-black">
        Welcome to My Home Page
      </h1>
      <button
        onClick={() => signOut()}
        className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-lg text-sm transition-transform transform hover:scale-95 mt-4"
      >
        Logout
      </button>
    </div>
  );
}

export default HomePage;

"use client";
import React from "react";

function page({ params }) {
  console.log("params", params);
  return <div>my params id:{params.id} </div>;
}

export default page;

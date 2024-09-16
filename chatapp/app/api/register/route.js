//api/register/route.js
import { connectMongoDB } from "../../../libs/mongodb";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

export async function POST(req) {
  try {
    const { name, email, password,role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use." },
        { status: 409 }
      );
    }
    
    const newUser = await User.create({ name, email, password: hashedPassword,role:"user"});

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "10d",
    });

    newUser.token = token;
    await newUser.save();

    // Respond with success message and token
    return NextResponse.json(
      { message: "User registered.", token },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during registration:", error.message);
    } else {
      console.error("Unknown error during registration:", error);
    }
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

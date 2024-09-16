import mongoose from "mongoose";

const mongoDBConfig = {
  MONGODB_URI: process.env.MONGODB_URI,
};

export async function connectMongoDB() {
  try {
    if (!mongoDBConfig.MONGODB_URI) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoDBConfig.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Unknown error connecting to MongoDB:", error);
    }
  }
}

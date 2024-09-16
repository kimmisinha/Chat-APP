import { connectMongoDB } from "../../../../libs/mongodb";
import User from "../../../../models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });
          // console.log("user",user)

          if (!user) {
            throw new Error("Account has not been registered");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Invalid password");
          }

          const storedToken = user.token; 
          // console.log("storedToken", storedToken);

          // Decode the token
          let decodedToken;
          try {
            decodedToken = jwt.verify(storedToken, JWT_SECRET);
          } catch (error) {
            console.error("Error decoding token:", error);
            throw new Error("Invalid or expired token");
          }

          if (decodedToken.id !== user._id.toString()) {
            throw new Error("Token does not match user");
          }

          return { ...user.toObject(), token: storedToken };

        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "",
  pages: {
    signIn: "/sigin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.email = user.email;
        token.token = user.token; 
        token.role=user.role
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.token = token.token; 
        session.user.role = token.role; 

      }
      // console.log(session)
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

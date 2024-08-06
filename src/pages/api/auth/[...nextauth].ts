import NextAuth from "next-auth";
import { authOptions } from "@/server/auth"; // Ensure this path is correct

export default NextAuth(authOptions);

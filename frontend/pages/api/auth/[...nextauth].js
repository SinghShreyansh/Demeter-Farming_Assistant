import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // TwitterProvider({
    //     clientId: process.env.TWITTER_CLIENT_ID,
    //     clientSecret: process.env.TWITTER_CLIENT_SECRET,
    // }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  database: process.env.DB_URL,
  session: {
    jwt: true,
  },
  jwt: {
    secret: "Q8j2taf[g)FWe",
  },
  adapter: MongoDBAdapter(clientPromise),
});

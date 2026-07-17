import CredentialsProvider from "next-auth/providers/credentials";
import { LogInUser } from "@/action/server/auth";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const result = await LogInUser(credentials);
        if (result.success) {
          return {
            id: result.user._id.toString(),
            name: result.user.name,
            email: result.user.email,
            image: result.user.image || null,
            role: result.user.role || "user",
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const usersCollection = await dbConnect(collections.USERS);
          const existingUser = await usersCollection.findOne({ email: user.email });
          if (!existingUser) {
            await usersCollection.insertOne({
              providerId: "google",
              email: user.email,
              name: user.name,
              image: user.image,
              role: "user",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Google sign-in DB error:", error);
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          const usersCollection = await dbConnect(collections.USERS);
          const dbUser = await usersCollection.findOne({ email: user.email });
          token.id = dbUser?._id?.toString() || user.id;
          token.role = dbUser?.role || "user";
        } catch {
          token.id = user.id;
          token.role = user.role || "user";
        }
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

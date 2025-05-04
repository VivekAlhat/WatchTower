import jwt from "jsonwebtoken";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const response = await axios.post(
          `${process.env.WATCHTOWER_API_URL}/user`,
          { email: user.email }
        );
        const userId = response.data.user.id;
        user.id = userId;
        return true;
      } catch (error) {
        console.error(`Error during sign in: `, (error as Error).message);
        return false;
      }
    },
    async jwt({ token }) {
      token.accessToken = jwt.sign(
        { id: token.id, email: token.email },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
      );
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

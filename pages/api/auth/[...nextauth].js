import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BASE_URL = "https://surveycallback.gnani.site";

const providers = [
  Credentials({
    id: "credentials",
    name: "username-login",
    async authorize(credentials, req) {
      const payload = {
        email: credentials.email,
        password: credentials.password,
      };

      let res = null;

      if (credentials.isNew) {
        payload.mobile = credentials.mobile;
        res = await fetch(BASE_URL + "/register_user", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        res = await fetch(BASE_URL + "/login", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      const user = await res.json();
      
      // If no error and we have user data, return it
      if (user.code === 200 && user) {
        return user;
      } else {
        throw new Error(user.message);
      }
    },
  }),
];

const callbacks = {
  // Getting the JWT token from API response
  session: { jwt: true },
  async jwt({ token, user }) {
    if (user) {
      return {
        ...token,
        accessToken: user.data.token,
      };
    }

    return token;
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    error: "/error",
    signIn: "/login",
    newUser: "/signup",
  },
  secret: "1210e525b4fb4de680a47df25da940bd",
  session: {
    strategy: "jwt",
    maxAge: 10 * 30, // 10mins
  },
};

export default (req, res) => NextAuth(req, res, options);

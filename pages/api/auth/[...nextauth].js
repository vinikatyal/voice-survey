import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const BASE_URL = "http://172.16.22.5:8086";


const providers = [
  Credentials({
    id: "credentials",
    name: "username-login",
    async authorize(credentials, req) {
      const payload = {
        email: credentials.email,
        password: credentials.password,
      };

      let res = null

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

      if (!res.ok) {
        throw new Error("Error in login");
      }

      // If no error and we have user data, return it
      if (user.code === 200 && user) {
        return user;
      }

      // Return null if user data could not be retrieved
      return null;
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

    const res = await fetch(BASE_URL + "/get_user_profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken,
      },
    })
      .then((response) => {
        // Store userData to Session
        session.user = response.data;
      })
      .catch((error) => {
        // Error
        if (error.response) {
          console.log("error.response: " + error.request);
        } else if (error.request) {
          console.log("error.request: " + error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

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
};

export default (req, res) => NextAuth(req, res, options);

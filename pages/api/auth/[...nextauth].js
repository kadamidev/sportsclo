import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect()

        const user = await User.findOne({ username: credentials.username })

        if (bcrypt.compareSync(credentials.password, user.password)) {
          console.log("success")
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
})

import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"
import bcrypt from "bcryptjs"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

dbConnect()

export default async function register(req, res) {
  let { username, password } = req.body

  if (!username) {
    return res.status(400).json({ message: "Username is required" })
  }

  const usernameCheck = await User.findOne({ username })
  if (usernameCheck)
    return res.status(400).json({ message: "Username is unavailable" })

  password = await bcrypt.hash(password, 10)

  const user = new User({ username: username, password: password })

  try {
    user.save()
  } catch (e) {
    return res.status(400).json({ message: `failed: ${e}` })
  }
  return res.status(200).json({ username: user.username, id: user._id })
}

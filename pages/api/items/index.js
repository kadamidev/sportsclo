import dbConnect from "../../../utils/dbConnect"
import Item from "../../../models/Item"

export default async function index(req, res) {
  await dbConnect()
  try {
    const items = await Item.find({})
    if (items) return res.status(200).json(items)
  } catch (e) {
    return res.status(400).json({ message: `unable to retrieve: ${e}` })
  }
}

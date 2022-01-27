import dbConnect from "../../../utils/dbConnect"
import Item from "../../../models/Item"

export default async function item(req, res) {
  const { iid } = req.query
  await dbConnect()
  try {
    const item = await Item.findById(iid)
    if (item) {
      return res.status(200).json(item)
    } else {
      return res.status(400).json({ message: "invalid item id" })
    }
  } catch (e) {
    return res.status(400).json({ message: `unable to retrieve: ${e}` })
  }
}

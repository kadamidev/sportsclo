import dbConnect from "../../../utils/dbConnect"
// import Coupon from "../../../models/Coupon"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// dbConnect()

const coupons = {
  xmas: {
    code: "xmas",
    discount_val: 0.15,
    discount_type: "percent",
    items: { all: true },
    description: `'xmas' -15% storewide`,
  },
}

export default async function register(req, res) {
  let { couponCode } = req.query

  if (!couponCode) {
    return res.status(400).json({ message: "coupon is required" })
  }

  // const coupon = await Coupon.findOne({ couponCode })
  let coupon = null
  if (coupons.hasOwnProperty(couponCode)) coupon = coupons[couponCode]

  if (coupon) {
    return res.status(200).json({ coupon: coupon })
  } else {
    return res.status(400).json({ message: "Invalid coupon" })
  }
}

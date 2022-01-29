import express from 'express'
import Razorpay from "razorpay";

const router = express.Router()

router.post("/createOrder", async (req, res) => {
    try {
        const { amount } = req.body
        console.log({ amount })
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

export default router
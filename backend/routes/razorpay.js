const { json } = require('body-parser');
const express = require('express')
const router = express.Router();

// importing razorpay library
const Razorpay = require('razorpay')

//instatiating razorpay

// All resources can be accessed through this instance all give promises

var instance = new Razorpay({
    key_id: 'rzp_test_xee3l2g0TEEHZM',
    key_secret: 'o2zZQwaJn9oeQmG2WoD5mrjs',
});

router.post('/create', (req, res) => {
    // example to fetch all payments "instace.payment.fetch(paymentId)"


    // Createing an order

    // for every paymenting an order is important as that order is passed as a response for security


    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, (err, order) => {
        res.status(200).json(order);
    });

})

router.post('/success', (req, res) => {
    const trancid = req.body.trancid;
    res.json({ redirectTo: `http://localhost:5173/success/?trancid=${trancid}` })
})







module.exports = router;

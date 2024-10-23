const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { google } = require('googleapis');
const User = require('../models/User')

const JWT_SECRET = 'toyash123'


router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failure'
    }),
    async function (req, res) {
        // Successful authentication, redirect home.
        // console.log(res.req.user.id_token)
        const data = res.req.user;
        console.log(data)
        const googleToken = data.access_token
        const decoded = jwt.decode(data.id_token)
        console.log(decoded)
        // // res.redirect("http://localhost:5000/auth/createuser")
        let token = null
        try {
            let success = false;
            let user = await User.findOne({ email: decoded.email });

            // If the user is not found, create a new user
            if (!user) {
                user = new User({
                    name: decoded.name, // Assuming `decoded.name` is available; adjust if necessary
                    email: decoded.email
                });

                // Save the newly created user to the database
                await user.save();

                success = true;
            } else {
                success = true;
            }

            // If user is found or created, sign and return a JWT
            const data = {
                id: user.id
            };
            const token = jwt.sign(data, JWT_SECRET);
            console.log(token);

            // Respond with token if necessary
            // res.status(200).json({ success, authToken: token });
            res.redirect(`http://localhost:5173/callback/?authToken=${token}&googleToken=${googleToken}`)

        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: "Internal server error" });
        }
    });

// res.setHeader({ token })
// res.redirect(`http://localhost:3000/callback/?authToken=${token}&googleToken=${googleToken}`)

module.exports = router;
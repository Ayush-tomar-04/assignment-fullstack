const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 🔍 validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }

        // 🔍 find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // 🔍 compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // 🔐 generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        // ❌ remove password
        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            success: true,
            token,
            user: userData
        });

    } catch (err) {
        console.log(err); // 🔥 IMPORTANT for debugging
        return res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};
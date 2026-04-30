const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ FIX role handling
        const roleValue = role === "admin" ? "admin" : "member";

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: roleValue
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (err) {
        console.log(err); // ✅ IMPORTANT for debugging
        return res.status(500).json({
            success: false,
            message: "Signup failed"
        });
    }
};
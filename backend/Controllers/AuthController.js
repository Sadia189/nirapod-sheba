const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

/**
 * =========================
 * SIGNUP CONTROLLER
 * =========================
 */
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Check if all fields exist
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // 2. Check if user already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists, please login",
                success: false
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


/**
 * =========================
 * LOGIN CONTROLLER
 * =========================
 */
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // 1. Check user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({
                message: "Auth failed: email or password is wrong",
                success: false
            });
        }

        // 2. Check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(403).json({
                message: "Auth failed: email or password is wrong",
                success: false
            });
        }

        // 3. Role check
        if (user.role !== role) {
            return res.status(403).json({
                message: "Wrong role selected",
                success: false
            });
        }

        // 4. Generate JWT
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 5. Send response
        return res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
            role: user.role
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
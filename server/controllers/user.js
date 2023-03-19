import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt"

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;

        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Please enter all the fields.");
        }

        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            res.status(400);
            throw new Error("User already exists!");
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: passwordHash,
            pic
        });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            user.password = undefined;

            res.status(200).json({ token, user, msg: "Registration Successfull!" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Login
export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User doesn't exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        user.password = undefined;

        res.status(200).json({ token: token, user: user, msg: "Login Successfull!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// /api/user?search=tushar
export const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            // regex provides regular expresssion capabilities for pattern matching strings in queries
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    const filteredUser = [{
        user: null,
        isTrue: null
    }]

    if (users !== null) {
        const checkUser = (user) => {
            if (user.friends.includes(req.user._id)) {
                const val = {
                    user: user,
                    isTrue: true
                }
                filteredUser.push(val);
            } else {
                const val = {
                    user: user,
                    isTrue: false
                }
                filteredUser.push(val);
            }
        }

        users.map((user) => checkUser(user));
    }
    filteredUser.shift()
    res.send(filteredUser);
};

//update
export const bio = async (req, res) => {
    const userId = req.user._id;
    const {bio} = req.body
    
    const updatedUser = await Chat.findByIdAndUpdate(
        userId,
        {
            bio
        },
        {
            new: true
        }
    )

    if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
    } else {
        res.json(updatedUser);
    }
}
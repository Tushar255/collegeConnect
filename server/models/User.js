import mongoose from "mongoose";

// Schema
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        picturePath: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        friends: {
            type: Array,
            default: []
        },
        // description: String,
        // skills: String,
        // location: String
    },
    // { timestamps: true }
);

// Model
const User = mongoose.model("User", UserSchema);

export default User;
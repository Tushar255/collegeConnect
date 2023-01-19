import mongoose, { mongo } from "mongoose";

const friendSchema = new mongoose.Schema(
    {
        userName: String, 
        email: String
    }
)

const Friends = new mongoose.model("Friend", friendSchema);

export default Friends;
import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
    friends: [],
    friendRequests: []
}

const friendSlice = createSlice({
    name: "friend",
    initialState: { value: initialStateValues },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload.friends;
        },
        setFriendRequests: (state, action) => {
            state.friendRequests = action.payload.friendRequests;
        }
    }
})

export const { setFriends, setFriendRequests } = friendSlice.actions;

export default friendSlice;
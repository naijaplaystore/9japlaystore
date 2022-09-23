import { createSlice } from "@reduxjs/toolkit";

interface userState
{
    id?: string;
}

const initialState: userState = {
    id: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUser(state)
        {

        }
    }
})

export const { fetchUser } = userSlice.actions;
export default userSlice.reducer;
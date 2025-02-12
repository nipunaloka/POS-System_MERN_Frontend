import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    isAuth: false,  // Fixed typo here
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, name, phone, email, role } = action.payload;
            state._id = _id;
            state.name = name;
            state.phone = phone;
            state.email = email;
            state.role = role;
            state.isAuth = true;
        },

        removeUser: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = "";  // Fixed duplicate assignment (previously was state.name again)
            state.role = "";
            state.isAuth = false;  // Fixed typo here
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

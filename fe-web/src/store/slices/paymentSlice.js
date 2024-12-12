import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    totalPrice: 0,
};
const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPayment: (state, action) => {
            const newState = { ...state, ...action.payload };
            console.log("action.payload", action.payload);
            return newState;
        },
    },
});
export const { setPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

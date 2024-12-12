import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    name:"",
    email:"",
    phone:"",
    totalPrice: 0,
};
const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        addTotalPrice: (state, action) => {
            let { totalPrice } = action.payload;
            state.totalPrice = totalPrice;
        },
        addInfoPayment: (state, action) => {
            let { name,email,phoneNumber } = action.payload;
            state.name = name;
            state.email = email;
            state.phone = phoneNumber;
        }
    },
});
export const { addTotalPrice,addInfoPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

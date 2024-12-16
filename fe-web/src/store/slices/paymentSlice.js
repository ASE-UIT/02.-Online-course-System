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
            console.log("action.payload", action.payload);

            let {info } = action.payload;
            state.name = info.name;
            state.email = info.email;
            state.phone = info.phone;

        }

    },
});
export const { addTotalPrice,addInfoPayment } = paymentSlice.actions;
export default paymentSlice.reducer;

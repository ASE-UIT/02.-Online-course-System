import api from "@/api/apiConfig.js";

export const paymentApi = {
    getPaymentURL: async (paymentId) => {
        try{
            const token = JSON.parse(localStorage.getItem("auth"));
            const config ={
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const response = await api.get(`/payment/vnp-url/${paymentId}`,config);
            return response.data;
        }catch(error){
            console.log(error);
        }
    },
}
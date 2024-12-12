import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {courseCartApi} from "@/api/courseApi.js";


export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [result, setResult] = React.useState(false);
    const location = useLocation();
    const {newOrder} = location.state || {newOrder: null}
    const [order, setOrder] = React.useState(null);
    const getMyCart = async () => {
        try {
            const response = await courseCartApi.getMyCart();
            if (response?.success) {
                setOrder(response.data.items);
            }
        } catch (error) {
            console.log(error.response?.errors.msg);
        }
    };
    useEffect(() => {
        getMyCart();
    }, []);
    return(
        <div className="h-full w-full">
            <Stepper currentStep={currentStep} result={result} />
            <Outlet context={{setCurrentStep, setResult, order }}/>
        </div>
    );
}

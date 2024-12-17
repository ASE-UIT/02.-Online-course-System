import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {courseCartApi} from "@/api/courseApi.js";
import {useGetCartQuery} from "@/store/rtk/cart.services.js";


export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [result, setResult] = React.useState(false);
    const { data: cart } = useGetCartQuery();
    const order = cart?.data.items || null
    return(
        <div className="h-full w-full">
            <Stepper currentStep={currentStep} result={result} />
            <Outlet context={{setCurrentStep, setResult, order }}/>
        </div>
    );
}

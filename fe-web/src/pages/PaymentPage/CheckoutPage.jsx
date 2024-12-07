import {Outlet} from "react-router-dom";
import {Stepper} from "@/pages/PaymentPage/Stepper.jsx";
import React from "react";


export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [result, setResult] = React.useState(false);
    return(
        <div className="h-full w-full">
            <Stepper currentStep={currentStep} result={result} />
            <Outlet context={{setCurrentStep, setResult}}/>
        </div>
    );
}


import { cn } from "@/lib/utils"


export function Stepper({ currentStep, className, result }) {
    const steps = [
        { number: 1, label: "Thông tin" },
        { number: 2, label: "Thanh toán" },
        { number: 3, label: "Vào học" }
    ]
    return (
        <div className={cn("w-full max-w-4xl mx-auto px-8 pt-[25px] pb-[20px]", className)}>
            <div className="relative flex justify-between">
                {/* Progress Line */}
                <div className="absolute top-8 left-3 h-[6px] w-11/12 bg-gray-500">
                    <div
                        className={cn("absolute left-1 h-full bg-primary-500 transition-all duration-300",
                            currentStep === 1 ? "w-1/4"
                            : currentStep === 2 ? "w-3/4" : "w-3/4"
                        )}
                    />
                    {currentStep === 3 && (
                        <div
                            className={cn(
                                "absolute h-full transition-all duration-300",
                                "w-1/4",
                                "right-0",
                                result ? "bg-success-500":"bg-error-500"
                            )}
                        />
                    )}
                </div>

                {/* Steps */}
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="relative flex flex-col items-center"
                    >
                        <div
                            className="z-10 flex h-16 w-16 items-center justify-center rounded-full
                                border-[2px] bg-white transition-colors border-primary-500 text-text/lg/semibold font-worksans"
                        >
                            {step.number}
                        </div>
                        <span
                            className={
                                "mt-[5px] text-text/md/medium font-worksans text-black"
                            }
                        >
              {step.label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}


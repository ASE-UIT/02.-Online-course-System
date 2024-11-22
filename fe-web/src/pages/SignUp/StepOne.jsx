import { useParams } from "react-router-dom";
import StepOneWithEmail from "./StepOneWithEmail";
import StepOneWithPhone from "./StepOneWithPhone";

const StepOne = () => {
  const { signUpType } = useParams();

  return (
    <>{signUpType === "email" ? <StepOneWithEmail /> : <StepOneWithPhone />}</>
  );
};

export default StepOne;

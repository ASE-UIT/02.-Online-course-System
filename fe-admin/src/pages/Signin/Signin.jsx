import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <section className="w-full h-screen">
      <div className="flex h-screen gap-10 justify-center items-center px-10 py-10 self-stretch bg-gray-100">
        <div className="max-w-[600px] flex gap-10 w-[1133px] py-10 justify-center items-center border rounded-[40px] bg-white shadow-[0px_8px_72.4px_0px_rgba(0,0,0,0.13)]">
          {/* Form */}
          <div className="w-full px-10">
            <SignInForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;

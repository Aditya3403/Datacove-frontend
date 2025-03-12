import React, { useContext, useState } from "react";
import { SquareX } from "lucide-react";
import useAppStore from "../store/useAppStore";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const SignUpPage = () => {
  const { closeSignUp } = useAppStore();
  const { formData, setFormData, handleChange, handleUserType, handleSubmit } =
    useContext(AppContext);

  // console.log("USERTYPE:", formData.userType);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-2">
      <div className="bg-[#030614] w-full max-w-4xl p-8 rounded-2xl shadow-2xl md:flex md:flex-row relative md:h-[32rem] border border-violet-400/20 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={closeSignUp}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        >
          <SquareX className="w-6 h-6 text-red-400 hover:text-red-300 transition-colors" />
        </button>

        {/* Left Side */}
        <div className="md:flex md:w-5/12 mt-4">
          <div className="flex flex-col items-center w-full p-6 space-y-6">
            <h2 className="text-2xl text-white font-beVietnam font-bold mb-6 bg-gradient-to-r from-violet-300 to-violet-100 bg-clip-text text-transparent">
              Choose Your Path
            </h2>

            {/* Sign Up Options */}
            <div className="w-full space-y-4">
              <button
                className={`w-full py-3 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.userType === "individual"
                    ? "bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-violet-400/20"
                }`}
                onClick={() => {
                  handleUserType("individual");
                  setFormData((prev) => ({
                    ...prev,
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    companyName: "",
                  }));
                }}
              >
                Individual
              </button>

              <button
                className={`w-full py-3 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.userType === "company"
                    ? "bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] text-white shadow-lg shadow-purple-500/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-violet-400/20"
                }`}
                onClick={() => {
                  handleUserType("company");
                  setFormData((prev) => ({
                    ...prev,
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    companyName: "",
                  }));
                }}
              >
                Company
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center w-full gap-4 py-4">
              <div className="h-[1px] flex-1 bg-violet-400/20"></div>
              <span className="text-violet-200 font-medium">OR</span>
              <div className="h-[1px] flex-1 bg-violet-400/20"></div>
            </div>

            {/* Login Option */}
            <button
              className={`w-full py-3 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                formData.userType === "Login"
                  ? "bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-violet-400/20"
              }`}
              onClick={() => {
                handleUserType("Login");
                setFormData((prev) => ({
                  ...prev,
                  name: "",
                  email: "",
                  phoneNumber: "",
                  password: "",
                  companyName: "",
                }));
              }}
            >
              Login
            </button>

            {/* Forget Password Link */}

            <p className="text-sm text-gray-400">
              Can't login?{" "}
              <Link
                to={"/forgetpassword"}
                className="text-[#CE9FFC] hover:text-[#7367F0] transition-colors duration-200"
              >
                Forget Password
              </Link>
            </p>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-[1px] bg-violet-400/20"></div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-7/12 p-6">
          <h2 className="text-2xl text-white font-beVietnam font-bold mb-8 bg-gradient-to-r from-violet-300 to-violet-100 bg-clip-text text-transparent">
            {formData.userType === "individual"
              ? "Individual Sign Up"
              : formData.userType === "company"
              ? "Company Sign Up"
              : "Welcome Back"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
          {formData.userType === "individual" && (
            <>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
              />
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
              />
              <div className="relative w-full">
                <PhoneInput
                  country={'ca'}
                  value={formData.phoneNumber}
                  onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
                  inputClass="!w-full !h-[52px] !pl-14 !pr-3 !border !border-violet-400/20 !rounded-xl !bg-white/5 !text-white !placeholder-gray-400 !focus:outline-none !focus:border-violet-400/40 !focus:ring-1 !focus:ring-violet-400/40 !transition-all !duration-200"
                  containerClass="!w-full"
                  buttonClass="!bg-transparent !border-none !absolute !left-3 !top-1/2 !transform !-translate-y-1/2 !scale-125"
                  dropdownClass="!bg-black !border !border-violet-400/20 !rounded-xl !text-white !shadow-lg !max-h-60 !overflow-y-auto !scrollbar-none"
                />
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
              />
            </>
          )}

            {/* Company Form Fields */}
            {formData.userType === "company" && (
              <>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
                />
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
                />
                <div className="relative w-full">
                  <PhoneInput
                    country={'ca'}
                    value={formData.phoneNumber}
                    onChange={(phone) => setFormData({ ...formData, phoneNumber: phone })}
                    inputClass="!w-full !h-[52px] !pl-14 !pr-3 !border !border-violet-400/20 !rounded-xl !bg-white/5 !text-white !placeholder-gray-400 !focus:outline-none !focus:border-violet-400/40 !focus:ring-1 !focus:ring-violet-400/40 !transition-all !duration-200"
                    containerClass="!w-full"
                    buttonClass="!bg-transparent !border-none !absolute !left-3 !top-1/2 !transform !-translate-y-1/2 !scale-125"
                    dropdownClass="!bg-black !border !border-violet-400/20 !rounded-xl !text-white !shadow-lg !max-h-60 !overflow-y-auto !scrollbar-none"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
                />
              </>
            )}

            {/* Login Form Fields */}
            {formData.userType === "Login" && (
              <>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 border border-violet-400/20 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/40 transition-all duration-200"
                />
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-[#CE9FFC] to-[#7367F0] text-white transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-violet-400/40 shadow-lg shadow-purple-500/30"
            >
              {formData.userType === "Login" ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

// const navigate = useNavigate();

// const [formData, setFormData] = useState({
//   userType: "individual",
//   name: "",
//   email: "",
//   phoneNumber: "",
//   password: "",
//   companyName: "",
// });

// Handle input change
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: value,
//   }));
// };

// Handle user type selection
// const handleUserType = (type) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     userType: type,
//   }));
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   // console.log("DATA", formData);
//   if (formData.userType === "individual") {
//     indiSignUp({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phoneNumber,
//       password: formData.password,
//     });
//     closeSignUp();
//   } else if (formData.userType === "company") {
//     orgSignUp({
//       name: formData.name,
//       email: formData.email,
//       phone: formData.phoneNumber,
//       organizationName: formData.companyName,
//       password: formData.password,
//     });
//     closeSignUp();
//   } else {
//     login(
//       {
//         email: formData.email,
//         password: formData.password,
//       },
//       navigate
//     );

//     closeSignUp();
//   }
// };

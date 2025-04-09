import React, { useEffect,useContext } from "react";
import Data from "../Data/PricingData";
import check from "../assets/tick.png";
import price_icon from "../assets/price-icon.png";
import shape from "../assets/shape.png";
import cloud from "../assets/cloud.png";
import hero from "../assets/hero-bg.png";
import Footer from "../Footer/Footer";
import { AppContext } from "../context/AppContext";
import SignUpPage from "../Pages/SignUpPage"; // Import the SignUpPage component
import useAppStore from "../store/useAppStore";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const { user } = useContext(AppContext); // Get user from context

  const { 
    isSignUpOpen, 
    openSignUp, 
    closeSignUp,
    isCheckingAuth
  } = useAppStore();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard'); // Redirect logged-in users immediately
    } else {
      openSignUp(); // Only open signup for non-logged-in users
    }
  };

  return (
    <div className="home-container">
      {/* Show SignUpPage popup if not logged in and modal is open */}
      {!user && isSignUpOpen && <SignUpPage />}
      <img
        src={hero}
        alt=""
        className="absolute top-0 left-0 w-full h-auto -z-40"
      />
      <div className="flex justify-center items-center flex-col mt-36">
        <h1 className="font-[700] text-[36px] sm:text-[48px] bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
          Pricing
        </h1>
        <p className="text-[#8F9BB7] text-[14px] text-[400] text-center mt-4 mb-4">
          Select from best plan, ensuring a perfect match. Need more or less?
          Customize your <br /> subscription for a seamless fit!
        </p>
        <div className="mt-12">
          <div className="border border-gray-500  p-1 gap-1 flex rounded-lg bg-[#1a1e38] justify-center align-middle items-center border-opacity-10 ">
            <div className="bg-[#7214FF]  rounded-lg p-1 pl-3 pr-3 ">
              <button className="text-[14px]  pb-1 text-center align-middle flex justify-center">
                Monthly
              </button>
            </div>
            <div className=" p-2 rounded-lg">
              <button className="text-[14px] pl-2 pr-2">Anually</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[1rem] max-lg:flex-wrap mt-8 justify-center mb-8 align-middle">
        {Data.map((item) => (
          <div
            key={item.id}
            style={{
              background:
                "linear-gradient(195.05deg, rgba(163, 43, 255, 0.1) 0%, rgba(248, 43, 255, 0.02) 50%, rgba(153, 43, 255, 0.06) 100%)",
            }}
            className="w-[22rem] max-lg:w-full h-auto gap-3 rounded-3xl p-8 flex flex-col relative group"
          >
            <div
              className="absolute inset-0 rounded-lg border-2 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                borderImageSource:
                  "linear-gradient(195.05deg, rgba(163, 43, 255, 0.8) 0%, rgba(167, 43, 255, 0.4) 50%, rgba(153, 43, 255, 0.06) 100%)",
                borderImageSlice: 1,
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            ></div>
            <div>
              <img src={price_icon} alt="" />
            </div>
            <div>
              <h4 className=" text-[20px]">{item.title}</h4>

              <p className="  text-[14px] text-white text-opacity-80">
                {item.description}
              </p>
            </div>

            <div className="flex items-center mt-4 mb-4">
              {item.price && (
                <>
                  <div className="text-[38px] leading-none font-[500] font-beVietnam">
                    {item.price.toLowerCase() === "free" ? (
                      <>Free</>
                    ) : (
                      <>
                        ${item.price}
                        <span className="text-[12px] font-beVietnam text-[#FFFFFFCC] text-opacity-80">
                          /per month
                        </span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            <div
              className="flex justify-center items-center align-middle rounded-lg border-[0.5px] border-gray-400 border-opacity-10  cursor-pointer transition duration-300 ease-in-out"
              style={{
                background:
                  "linear-gradient(195.05deg, rgba(163, 43, 255, 0.1) 0%, rgba(248, 43, 255, 0.02) 50%, rgba(153, 43, 255, 0.06) 100%)",
              }}
            >
              <button 
                onClick={handleGetStarted}
                className="text-center p-2  transition duration-300 ease-in-out w-full hover:bg-[#7214FF] rounded-lg"
              >
                Get Started
              </button>
            </div>

            <hr className="border-t h-[.5px] mt-2 border-[#282D45]" />
            <div className="mt-5">
              <h4 className="mb-2">What will you get?</h4>
              <ul className="overflow-hidden flex flex-col justify-around">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-start py-2 ">
                    <img src={check} width={20} height={20} alt="Check" />
                    <p className="ml-2 text-[13px] text-opacity-80 text-[#FFFFFFCC]">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mb-24">
        <div className="mt-12 md:mt-24 flex flex-col justify-center items-center w-full md:w-[80%]">
          <div
            style={{
              backgroundImage: `url(${shape})`,
            }}
            className="bg-cover bg-center h-40 sm:h-56 md:h-64 w-[80%] lg:w-full rounded-md relative"
          >
            <div
              style={{
                backgroundImage: `url(${cloud})`,
                backgroundRepeat: "no-repeat",
              }}
              className="bg-center flex items-center justify-center h-full absolute lg:top-1.5 top-0 left-0 w-full"
            >
              <div className="flex justify-center items-center flex-col text-center px-4 md:px-0">
                <h2 className="text-white text-[20px] sm:text-2xl md:text-[30px] font-bold">
                  Customized Pricing
                </h2>
                <p className="text-[10px] sm:text-sm md:text-base mt-2 text-[#8F9BB7]">
                  Not getting what you're looking for? Contact us and get your
                  <br />
                  own customized pricing plan
                </p>
                <button 
                  onClick={handleGetStarted}
                  className="bg-[#5865F2] px-4 py-2 sm:px-6 sm:py-3 md:pl-6 md:pr-6 md:pt-3 md:pb-3 rounded-2xl text-[10px] sm:text-[12px] md:text-sm mt-4 md:mt-5"
                >
                  Book A Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
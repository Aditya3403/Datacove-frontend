import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ChevronRight, ChevronsRight } from "lucide-react";
import hero_temp from "../assets/hero-temp.png";

const Hero = () => {
  return (
    <div className="mb-[4rem]">
      <div className="relative flex justify-center items-center flex-col mt-[12rem] sm:mt-10 lg:mt-36 px-4 my-auto">
        {/* Radial Gradient Background */}
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(31, 143, 255, 0.5) 0%, rgba(31, 143, 255, 0) 100%)",
            borderRadius: "50%",
            zIndex: "-10",
            filter: "blur(90px)",
          }}
        ></div>

        {/* Content */}
        <h1 className="font-[500] text-2xl sm:text-3xl md:text-4xl lg:text-[58px] text-center p-8 lg:leading-[1] bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
          AI-Agent Powered <br /> Document Intelligence
        </h1>

        <p className="text-center w-[80%] sm:w-[80%] md:w-[60%] lg:w-[45%] text-sm sm:text-base lg:text-[14px] mt-3 sm:mt-4 lg:mt-5 text-[#8F9BB7]">
          Datacove's Autonomous workflows leverages Al-Agents to accelerate
          document validation, compliance, summarization, and strategic
          insights. Enterprise-grade security and seamless integration
          capabilities that evolve with your business needs.
        </p>

        <Link to={"/contact-us"}>
          <button
            className="flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-md text-[1rem] mt-4 sm:mt-5 lg:mt-6 
               bg-gradient-to-b from-[rgba(60,65,68,0)] to-[rgba(157,170,175,0.62)] 
               backdrop-blur-md"
            style={{
              boxShadow: `
                0px 4px 4px 0px #0000000D, 
                0px 10px 10px 0px #0000001A, 
                0px 10px 40px 0px #FFFFFF26, 
                inset 0px 8px 10px 0px #F6F8FF33`,
            }}
          >
            START FREE TRIAL <ChevronRight />
          </button>
        </Link>
      </div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }} // Start small and invisible
        animate={{ scale: 1, opacity: 1 }} // Grow to full size and become visible
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth effect
        className="relative flex justify-center items-center mt-4 sm:mt-6 lg:mt-8  max-w-7xl align-middle mx-auto"
      >
        {/* Animated Glow Effect */}
        {/* <div className="absolute w-[80%] sm:w-[60%] md:w-[70%] lg:w-[90%] h-[60%] md:h-[80%] rounded-full  opacity-50 blur-[80px] animate-pulse"></div> */}

        {/* Image */}
        {/* <div className="absolute inset-0 bg-[#150c45] blur-[25px] rounded-md"></div> */}

        <img
          src={hero_temp}
          alt="AI-driven Contract Analysis"
          className="w-full sm:w-[90%] md:w-[80%] lg:w-full h-auto object-contain relative rounded-md "
        />
      </motion.div>
    </div>
  );
};
// const Hero = () => {
//   return (
//     <div>
//       <div className="flex justify-center items-center flex-col mt-10">
//         <h1 className="font-[700] text-[48px] bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
//           AI-Driven Automated Contract Analysis
//         </h1>

//         <p className="text-center w-[40%] text-[14px] mt-5 text-[#8F9BB7]">
//           Datacove’s Diligence leverages advanced AI to accelerate contract
//           reviews for M&A, lease agreements, compliance, and repapering.
//           Offering instant insights across 1,000+ legal concepts, it helps
//           lawyers prioritize tasks, adapt quickly, and stay ahead of the
//           competition.
//         </p>
//         <button className="bg-[#7214FF] pl-4 pr-4 pt-2 pb-2  rounded-2xl text-[12px] mt-5">
//           Get a Demo
//         </button>
//       </div>
//       {/* <hr className="border-t h-[.5px] mt-4 border-[#1F1F1F]" /> */}

//       <div className="flex justify-center items-center mt-5">
//         <img
//           src={image}
//           alt=""
//           className="filter hue-rotate-190 saturate-250 brightness-100"
//         />
//       </div>
//     </div>
//   );
// };

export default Hero;

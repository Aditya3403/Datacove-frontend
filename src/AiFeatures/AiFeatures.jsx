import React from "react";
import payment_blur from "../assets/payment_blur.png";
import { ChevronRight } from "lucide-react";
import ms_word from "../assets/ms_word_1.png";
import ms_bg from "../assets/ms-bg.png";
import seamless from "../assets/seamless.png";
import seamless_img from "../assets/seamless_img.png";
import agentic_img from "../assets/agentic_img.png";

const AiFeatures = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-[10%] mb-8 md:mb-[2rem]">
      <div className="w-full z-0">
        <h3 className="text-center text-white text-[1rem] mb-[1rem]">
          AI F<span className="text-white/70">ea</span>
          <span className="text-white/60">tu</span>
          <span className="bg-gradient-to-r from-white/50 to-transparent text-transparent bg-clip-text">
            res
          </span>
        </h3>

        <h2 className="text-center text-xl sm:text-2xl md:text-[1rem] mb-[2rem]">
          Experience the Future of Document Intelligence
        </h2>
      </div>

      <div className="relative flex flex-col max-w-5xl mx-auto z-10 gap-3 md:gap-8 mt-6 ">
        {/* First row */}
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
          <div className="payment-bg flex flex-col p-4 border border-white/20 w-full md:w-[40%] rounded-2xl">
            <div className="my-2">
              <img
                src={payment_blur}
                alt=""
                className="w-full max-w-full h-auto"
              />
            </div>
            <h2 className="text-lg sm:text-xl">
              AI-Powered <span className="text-white/70">Va</span>
              <span className="text-white/60">li</span>
              <span className="text-white/50">da</span>
              <span className="text-white/40">ti</span>
              <span className="text-white/30">on</span>
            </h2>
            <p className="text-sm text-white/40 text-justify my-2">
              AI transforms unstructured document data into structured,
              actionable intelligence. Ensure every document is complete,
              accurate, and compliant with error detection and risk flagging
            </p>
            <button className="flex items-center text-white/40 border border-white/60 w-full sm:w-auto sm:max-w-[12rem] p-2 rounded-md mt-auto">
              Learn more <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>

          <div
            className="border border-white/20 rounded-2xl p-4 flex flex-col justify-between w-full md:w-[60%] bg-cover bg-center"
            style={{
              backgroundImage: `url(${ms_bg})`,
            }}
          >
            <div className="my-2">
              <img src={ms_word} alt="" className="w-full max-w-full h-auto" />
            </div>
            <h2 className="text-lg sm:text-xl">
              Enterprise Privacy
              <span className="text-white/70">A</span>
              <span className="text-white/60">g</span>
              <span className="text-white/50">e</span>
              <span className="text-white/40">n</span>
              <span className="text-white/30">t</span>
              <span className="text-white/30">s</span>
            </h2>
            <p className="text-sm text-white/40 text-justify w-full my-2">
              AI transforms unstructured document data into structured,
              actionable intelligence. Ensure every document is complete,
              accurate, and compliant with error detection and risk flagging
            </p>
            <button className="flex items-center text-white/40 border border-white/60 w-full sm:w-auto sm:max-w-[12rem] p-2 rounded-md mt-auto">
              Learn more <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

        {/* Second row */}
        <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-4">
          <div
            style={{
              backgroundImage: `url(${seamless})`,
            }}
            className="border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col justify-between gap-3 md:gap-4 w-full md:w-[60%] bg-cover bg-center order-1 md:order-1"
          >
            <h2 className="text-lg sm:text-xl">
              Seamless Automation &<span className="text-white/90">I</span>
              <span className="text-white/80">n</span>
              <span className="text-white/70">t</span>
              <span className="text-white/60">e</span>
              <span className="text-white/50">g</span>
              <span className="text-white/40">r</span>
              <span className="text-white/30">a</span>
              <span className="text-white/20">t</span>
              <span className="text-white/10">i</span>
              <span className="text-white/5">o</span>
              <span className="text-white/5">n</span>
            </h2>
            <p className="text-sm text-white/40 text-justify w-full my-2">
              Upload documents and get structured reports effortlessly, with
              zero manual effort and full process integration with your existing
              enterprise systems through our comprehensive API suite
            </p>
            <button className="flex items-center text-white/40 border border-white/60 w-full sm:w-auto sm:max-w-[12rem] p-2 rounded-md">
              Learn more <ChevronRight className="w-5 h-5 ml-1" />
            </button>
            <div>
              <img
                src={seamless_img}
                alt=""
                className="w-full max-w-full h-auto"
              />
            </div>
            <div
              className="absolute left-0 bottom-0 w-full h-full blur-3xl  pointer-events-none z-50"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(92, 173, 255, 0.5) 0%, rgba(31, 143, 255, 0) 100% )",
              }}
            ></div>
          </div>

          <div className="border border-white/20 rounded-2xl p-4 md:p-6 flex flex-col justify-between gap-3 md:gap-4 w-full md:w-[40%] bg-cover bg-center order-2 md:order-2">
            <h2 className="text-lg sm:text-xl">
              Expandable Agentic <span className="text-white/80">F</span>
              <span className="text-white/70">r</span>
              <span className="text-white/60">a</span>
              <span className="text-white/50">m</span>
              <span className="text-white/40">e</span>
              <span className="text-white/30">w</span>
              <span className="text-white/20">o</span>
              <span className="text-white/10">r</span>
              <span className="text-white/10">k</span>
            </h2>
            <p className="text-sm text-white/40 text-justify my-2">
              Modular AI agent architecture adapts to evolving business
              requirements with domain-specific intelligence. Deploy pre-built
              agents for immediate value.
            </p>
            <button className="flex items-center text-white/40 border border-white/60 w-full sm:w-auto sm:max-w-[12rem] p-2 rounded-md">
              Learn more <ChevronRight className="w-5 h-5 ml-1" />
            </button>
            <div className="w-full">
              <img
                src={agentic_img}
                alt=""
                className="w-full max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient */}
    </div>
  );
};

export default AiFeatures;

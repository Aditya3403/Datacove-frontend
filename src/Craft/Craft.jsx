import React from "react";
import craft from "../assets/CRAFT_BG.png";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Craft = () => {
  return (
    <div className="relative  sm:px-6 md:px-[8%]   py-12 md:py-16 min-h-[400px] flex justify-center w-full mx-auto mb-[4rem] md:mb-[7rem]">
      {/* Radial Gradient Background */}
      {/* <div className="absolute inset-0 w-full h-full flex justify-center items-center">
        <div
          className="w-[90vw] h-[90vh] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] md:h-[80vh] rounded-full absolute blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(92, 173, 255, 0.3) 0%, rgba(31, 143, 255, 0) 100%)",
          }}
        ></div>
      </div> */}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-12 items-center justify-between max-w-[1500px] p-4">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-6 lg:space-y-8 p-0 sm:p-4">
          <h3 className="text-[1.5rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[3rem] leading-tight lg:leading-[1.1]">
            <span className="text-white text-sm md:text-[1.5rem] lg:text-[3rem]">
              Agentic
            </span>{" "}
            <span className="text-white/50 text-[1rem]  md:text-[1.1rem] lg:text-[2rem] ">
              Document Workflows for Every Industry
            </span>
          </h3>

          <div className="space-y-4 md:space-y-5 lg:space-y-6">
            <div className="space-y-1 md:space-y-2">
              <p className="text-white/90 text-sm sm:text-sm md:text-md">
                Legal Precision
              </p>
              <p className="text-white/60 text-sm sm:text-sm">
                Analyze contracts, track compliance, and uncover hidden details
                effortlessly—saving hours while ensuring accuracy.
              </p>
            </div>

            <div className="space-y-1 md:space-y-2">
              <p className="text-white/90 text-sm sm:text-sm md:text-md">
                Supply Chain Efficiency
              </p>
              <p className="text-white/60 text-sm sm:text-sm">
                Automate invoice verification, validate trade documentation, and
                detect discrepancies instantly, keeping your supply chain moving
                smoothly and reducing costly delays.
              </p>
            </div>

            <div className="space-y-1 md:space-y-2">
              <p className="text-white/90 text-sm sm:text-sm md:text-md">
                Recruitment Simplified
              </p>
              <p className="text-white/60 text-sm sm:text-sm">
                Streamline hiring by letting AI assess resumes, match candidates
                to roles, and flag discrepancy issues, so you can focus on
                building the perfect team with less effort.
              </p>
            </div>
          </div>

          <Link to="/contact-us" className="inline-block">
            <button
              className="flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-md text-base sm:text-lg
                bg-gradient-to-b from-[rgba(60,65,68,0)] to-[rgba(157,170,175,0.62)]
                backdrop-blur-md transition-transform hover:scale-105"
              style={{
                boxShadow: `
                  0px 4px 4px 0px #0000000D,
                  0px 10px 10px 0px #0000001A,
                  0px 10px 40px 0px #FFFFFF26,
                  inset 0px 8px 10px 0px #F6F8FF33`,
              }}
            >
              START FREE TRIAL <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 hidden md:block justify-center md:justify-end ">
          <img
            src={craft}
            alt="Craft Interface"
            className=" w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-none md:max-h-[50vh] p-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Craft;

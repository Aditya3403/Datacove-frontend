import React from "react";
import dashboard from "../assets/ai-dashboard.png";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AiDashboard = () => {
  return (
    <div className="min-h-[60vh] px-4 sm:px-6 md:px-[10%] py-12 md:py-16 my-8 md:my-16">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
        {/* Image Container */}
        <div className="w-full md:w-[60%] relative order-2 md:order-1">
          <img
            src={dashboard}
            alt="AI Dashboard Interface"
            className="w-full h-auto object-contain max-h-[600px]"
          />
          {/* Radial Gradient */}
          <div
            className="absolute left-0 bottom-0 w-full h-full md:w-[80%] md:h-[80%] rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(92, 173, 255, 0.5) 0%, rgba(31, 143, 255, 0) 100%)",
              opacity: "0.6",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="w-full md:w-[40%] space-y-6 order-1 md:order-2">
          <h3 className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] leading-tight">
            <span className="text-white">Business </span>{" "}
            <span className="text-white/50">Growth through AI Excellence</span>
          </h3>

          <p className="text-white/65 text-base md:text-lg max-w-xl">
            Simplify and organize your document workflows. Our expandable
            agentic framework automates validation, compliance, summarization,
            and strategic insights—with enterprise-grade security and seamless
            integration capabilities for both end-users and B2B environments.
          </p>

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
      </div>
    </div>
  );
};

export default AiDashboard;

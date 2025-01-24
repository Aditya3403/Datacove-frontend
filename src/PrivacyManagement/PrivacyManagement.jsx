import React from "react";
import icon from "../assets/icon.png";
import icon1 from "../assets/icon-1.png";
import icon2 from "../assets/icon-2.png";

const PrivacyManagement = () => {
  return (
    <div className="flex flex-col items-center m-auto max-w sm:min-w-[90%] lg:min-w-[80%] mt-14 px-4">
      <div className="flex flex-col lg:flex-row justify-between mt-10 w-full gap-6">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[42px] text-center lg:text-left bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent font-bold">
          All in One Privacy <br className="hidden lg:block" /> Management
        </h1>
        <p className="text-[14px] sm:text-[12px] lg:text-[12px] leading-[18px] text-[#8F9BB7] w-full lg:w-[40%] text-center lg:text-left">
          Enhance your website’s functionality by integrating advanced tools
          designed to ensure seamless cookie compliance and bolster user privacy
          management. These powerful features provide comprehensive control over
          cookie usage.
        </p>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-between gap-4 lg:gap-y-6 w-full">
        <div className="bg-[#282D45] bg-opacity-40 border border-gray-600 border-opacity-20 rounded-[4px] w-full sm:w-[48%] lg:w-[32%]">
          <img src={icon} alt="Icon" className="pl-4 pt-8" />
          <div className="pl-4 pt-4 pb-8 pr-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold mb-2">
              Automated Documentations
            </h3>
            <p className="text-[12px] text-[#8F9BB7] text-justify">
              Datacove empowers lawyers to define the parameters of their review
              by selecting preferred standards or model versions of clauses or
              documents. Red-lining and green-lining features highlight
              compliance and deviations from the chosen model for easy
              comparison.
            </p>
          </div>
        </div>

        <div className="bg-[#282D45] bg-opacity-40 border border-gray-600 border-opacity-20 rounded-[4px] w-full sm:w-[48%] lg:w-[32%]">
          <img src={icon2} alt="Icon 2" className="pl-4 pt-8" />
          <div className="pl-4 pt-4 pb-8 pr-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold mb-2">
              Automated Documentations
            </h3>
            <p className="text-[12px] text-[#8F9BB7] text-justify">
              Datacove empowers lawyers to define the parameters of their review
              by selecting preferred standards or model versions of clauses or
              documents. Red-lining and green-lining features highlight
              compliance and deviations from the chosen model for easy
              comparison.
            </p>
          </div>
        </div>

        <div className="bg-[#282D45] bg-opacity-40 border border-gray-600 border-opacity-20 rounded-[4px] w-full sm:w-[48%] lg:w-[32%]">
          <img src={icon1} alt="Icon 3" className="pl-4 pt-8" />
          <div className="pl-4 pt-4 pb-8 pr-4">
            <h3 className="text-[16px] sm:text-[18px] font-bold mb-2">
              Automated Documentations
            </h3>
            <p className="text-[12px] text-[#8F9BB7] text-justify">
              Datacove empowers lawyers to define the parameters of their review
              by selecting preferred standards or model versions of clauses or
              documents. Red-lining and green-lining features highlight
              compliance and deviations from the chosen model for easy
              comparison.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyManagement;

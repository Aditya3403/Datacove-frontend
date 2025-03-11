import React from "react";
import hero from "../assets/hero-bg.png";
import feature from "../assets/feature-icon.png";
import kaspersky from "../assets/kaspersky.png";
import disney from "../assets/disney.png";
import McAfee from "../assets/McAfee.png";
import britbox from "../assets/britbox.png";
import comodo from "../assets/comodo.png";
import feature_img from "../assets/feature-img.png";
import feature_1 from "../assets/feature_1.png";
import feature_2 from "../assets/feature_2.png";
import feature_3 from "../assets/feature_3.png";
import feature_4 from "../assets/feature_4.png";
import about from "../assets/about_1.png";
import check from "../assets/check.png";
import heading from "../assets/features.png";
import section2 from "../assets/section2.png";
import ft from "../assets/fg-img3.png";
import service1 from "../assets/service_1.png";
import service2 from "../assets/service_2.png";
import service3 from "../assets/service_3.png";
import service4 from "../assets/service_4.png";
import service5 from "../assets/service_5.png";
import export_1 from "../assets/export.png";
import eclipse3 from "../assets/elipse3.png";
import elipse4 from "../assets/elipse4.png";
import Footer from "../Footer/Footer";
import CountUp from "react-countup";
import NewFooter from "../NewFooter/NewFooter";

const images = [
  { src: kaspersky, alt: "Kaspersky" },
  { src: disney, alt: "Disney" },
  { src: McAfee, alt: "McAfee" },
  { src: britbox, alt: "Britbox" },
  { src: comodo, alt: "Comodo" },
];

const MoreFeatures = () => {
  return (
    <div className="mt-32  ">
      {/* Hero */}
      <div className="home-container flex flex-col-reverse lg:flex-row gap-8 justify-between items-center px-4">
        <img
          src={hero}
          alt=""
          className="absolute top-0 left-0 w-full h-[70%] z-40 object-cover"
        />
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-[50%] text-center lg:text-left">
          <h1 className="font-[700] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] p-4 bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
            Prioritize high-value <br />
            tasks with AI powered <br />
            automation
          </h1>
          <p className="text-[#8F9BB7] text-sm sm:text-base font-[400] w-full lg:w-[90%] p-4">
            Maximize efficiency and focus on what truly matters. DataCove AI
            automates document analysis, contract reviews, and compliance
            validation—saving you time and reducing risks.
          </p>
          <div className="p-4 w-full sm:w-[50%] md:w-[40%] lg:w-[30%] mx-auto lg:mx-0">
            <button className="bg-[#7214FF] pl-4 pr-4 pt-3 pb-3 rounded-2xl text-sm sm:text-[14px] w-full">
              Get a demo
            </button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end items-center w-full lg:w-[50%]">
          <img
            src={feature}
            alt=""
            className="w-[20rem] h-[15rem] sm:w-[25rem] sm:h-[20rem] lg:w-[30rem] lg:h-[25rem]"
          />
        </div>
      </div>

      {/* Collab */}
      <div className="flex overflow-hidden feature-padding m-10">
        <ul className="flex animate-infinite-scroll gap-20">
          {[...images, ...images].map((image, index) => (
            <li key={index} className="flex p-2 h-24 w-24">
              <img
                src={image.src}
                alt={image.alt}
                className="h-32 w-32 object-contain"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* AI's Potential */}
      <div className="feature-padding_two flex flex-col lg:flex-row gap-6 justify-center items-center mb-6 mt-[10rem] lg:mt-[20rem] px-4 ">
        <div className="p-4">
          <img src={feature_img} alt="Feature" className="max-w-full h-auto" />
        </div>
        <div
          className="flex flex-col items-center bg-cover bg-center w-full lg:w-[50%] py-6 lg:-mt-[8rem]"
          style={{
            backgroundImage: `url(${heading})`,
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-center items-center text-center w-full lg:w-[80%] mb-6 z-40 lg:mt-[3rem]">
            <h2 className="font-[700] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] h-auto bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
              Unleashing AI’s Potential in Your Documents
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-start w-full lg:w-[80%] px-4 ">
            <div className="flex flex-col gap-8 w-full md:w-[45%]">
              <div className="flex gap-4 items-start">
                <img src={feature_1} alt="Feature 1" className="h-10 w-10" />
                <div>
                  <h2 className="text-base sm:text-lg font-beVietnam font-[600]">
                    Business Growth
                  </h2>
                  <p className="text-sm sm:text-base text-[#8F9BB7]">
                    Transform strategic planning with intelligent document
                    insights for informed decisions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <img src={feature_3} alt="Feature 3" className="h-10 w-10" />
                <div>
                  <h2 className="text-base sm:text-lg font-beVietnam font-[600]">
                    Operational Efficiency
                  </h2>
                  <p className="text-sm sm:text-base text-[#8F9BB7]">
                    Automate complex document workflows to reduce processing
                    time by 80%.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full md:w-[45%]">
              <div className="flex gap-4 items-start">
                <img src={feature_2} alt="Feature 2" className="h-10 w-10" />
                <div>
                  <h2 className="text-base sm:text-lg font-beVietnam font-[600]">
                    Customer Experience
                  </h2>
                  <p className="text-sm sm:text-base text-[#8F9BB7]">
                    Deliver precise, compliant documentation that builds trust
                    and satisfaction
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <img src={feature_4} alt="Feature 4" className="h-10 w-10" />
                <div>
                  <h2 className="text-base sm:text-lg font-beVietnam font-[600]">
                    Risk Management
                  </h2>
                  <p className="text-sm sm:text-base text-[#8F9BB7]">
                    Proactively identify compliance gaps before they become
                    costly liabilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Numbers */}
      <div className="bg-[#150C46] py-10 flex justify-center mt-14">
        <div className="flex flex-wrap justify-between gap-6 w-[90%] max-w-7xl">
          {/* Project Completed */}
          <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-auto">
            <h2 className="text-[28px] sm:text-[36px] font-[400] text-[#FFFFFF]">
              <CountUp end={95} duration={3} separator="," />%
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#9C9C9C] font-[400] text-center">
              Accuracy
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:flex justify-center items-center">
            <div className="border-[1px] h-[80%] border-[#FFFFFF] border-opacity-30"></div>
          </div>

          {/* Successful Years */}
          <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-auto">
            <h2 className="text-[28px] sm:text-[36px] font-[400] text-[#FFFFFF]">
              <CountUp end={75} duration={3} />%
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#9C9C9C] font-[400] text-center">
              Time Savings
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:flex justify-center items-center">
            <div className="border-[1px] h-[80%] border-[#FFFFFF] border-opacity-30"></div>
          </div>

          {/* Client Retention */}
          <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-auto">
            <h2 className="text-[28px] sm:text-[36px] font-[400] text-[#FFFFFF]">
              <CountUp end={60} duration={3} />%
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#9C9C9C] font-[400] text-center">
              Cost Reduction
            </p>
          </div>

          {/* Divider */}
          <div className="hidden sm:flex justify-center items-center">
            <div className="border-[1px] h-[80%] border-[#FFFFFF] border-opacity-30"></div>
          </div>

          {/* Countries */}
          <div className="flex flex-col justify-center items-center gap-3 w-full sm:w-auto">
            <h2 className="text-[28px] sm:text-[36px] font-[400] text-[#FFFFFF]">
              <CountUp end={10000} duration={3} />+
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#9C9C9C] font-[400] text-center">
              Documents Processed
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Features */}
      <div
        style={{
          backgroundImage: `url(${section2})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-full relative h-[80vh] flex flex-col lg:flex-row justify-center items-center mt-[10rem] lg:mt-0 px-4 lg:px-60"
      >
        <div className="w-full lg:w-[50%] mt-8 lg:mt-12 flex flex-col gap-6">
          <h2 className="font-[700] text-2xl sm:text-3xl md:text-4xl lg:text-[32px] text-center lg:text-left mb-6 bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
            Why Leading Organizations Choose DataCove AI
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#8F9BB7] text-center lg:text-left lg:w-[70%]">
            DataCove AI delivers enterprise-grade document intelligence that
            transforms how organizations process, analyze, and extract value
            from their documentation. Our platform combines cutting-edge
            artificial intelligence with industry-specific expertise to deliver
            unprecedented efficiency, accuracy, and strategic insights across
            your document workflows.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              "Legal",
              "Finance",
              "Healthcare ",
              "Supply Chain ",
              "Recruitment",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-[#FFFFFF0D] bg-opacity-5 p-3 rounded-md"
              >
                <img src={check} alt="" />
                <h3 className="text-[14px] sm:text-[16px] font-[600]">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[50%] flex justify-end mt-8 lg:mt-0">
          <img src={about} alt="" className="max-w-full h-auto object-cover" />
        </div>
      </div>
      <div className="text-center mt-20 px-4">
        <h2 className="font-[700] text-2xl sm:text-3xl md:text-4xl lg:text-[32px] mb-4 bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
          Exclusive Features
        </h2>
        <p className="text-[12px] sm:text-[14px] md:text-[16px] text-[#8F9BB7] font-[400]">
          DataCove AI's proprietary technology combines contextual understanding
          with industry-specific intelligence to deliver results that surpass
          traditional document processing solutions.
          <br className="hidden md:block" /> Our platform integrates seamlessly
          with your existing workflows while providing unprecedented visibility
          into your document ecosystem <br className="hidden md:block" />
        </p>
      </div>
      <div
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full relative -top-4 h-[90vh] flex flex-col justify-center mt-20"
      >
        <div className="flex flex-col justify-center items-center px-4 mt-9 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-center items-center w-full md:gap-10 lg:gap-10">
            <div className="flex justify-center lg:w-[40%]">
              <img
                src={ft}
                alt=""
                className="w-[16rem] h-[16rem] md:w-[22rem] md:h-[22rem] lg:w-[28rem] lg:h-[28rem] ml-0 lg:ml-[2rem] mt-[14rem] lg:mt-[5rem]"
              />
            </div>
            <div>
              <div className="w-auto gap-16 flex flex-col p-2">
                <div className="flex flex-row md:flex-row gap-4 md:gap-6 border rounded-md p-2 md:pl-6 md:pr-6 md:pt-3 md:pb-3 bg-[#FFFFFF0D] bg-opacity-5">
                  <div className="flex justify-center items-center align-middle">
                    <img
                      src={service1}
                      alt=""
                      className="w-[4rem] sm:w-[4rem] sm:h-[4rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] xl:w-[4rem] xl:h-[4rem]"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="md:text-[27px] lg:text-[27px] text-[20px] font-[600]">
                      Agentic Workflows
                    </h3>
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#67687A] font-[400]">
                      Customize AI processing pathways with domain-specific
                      agents tailored to your industry requirements
                    </p>
                  </div>
                  <div className="flex justify-end mt-2 items-center">
                    <div>
                      <img
                        src={export_1}
                        alt=""
                        className="w-full md:w-[80%]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-row gap-4 md:gap-6 rounded-md p-2 md:pl-6 md:pr-6 md:pt-3 md:pb-3 bg-[#FFFFFF0D] bg-opacity-5 md:ml-[5rem] md:-mr-[2rem] justify-center">
                  <div className="flex justify-center items-center align-middle">
                    <img
                      src={service2}
                      alt=""
                      className="w-[4rem] sm:w-[4rem] sm:h-[4rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] xl:w-[4rem] xl:h-[4rem]"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="md:text-[27px] lg:text-[27px] text-[20px] font-[600]">
                      Real-Time Streaming
                    </h3>
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#67687A] font-[400]">
                      Experience progressive AI insights as they develop,
                      enabling faster decision-making without delays
                    </p>
                  </div>
                  <div className="flex justify-center align-middle mt-2  items-center">
                    <div>
                      <img
                        src={export_1}
                        alt=""
                        className="w-full md:w-[80%]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-row gap-4 md:gap-6 rounded-md p-2 md:pl-6 md:pr-6 md:pt-3 md:pb-3 bg-[#FFFFFF0D] bg-opacity-5 md:ml-[7rem] md:-mr-[4rem] justify-center">
                  <div className="flex justify-center items-center align-middle">
                    <img
                      src={service3}
                      alt=""
                      className="w-[4rem] sm:w-[4rem] sm:h-[4rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] xl:w-[4rem] xl:h-[4rem]"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="md:text-[27px] lg:text-[27px] text-[20px] font-[600]">
                      Embedded Security
                    </h3>
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#67687A] font-[400]">
                      Maintain compliance with automatic PII redaction and
                      AES-256 encryption at every processing stage.
                    </p>
                  </div>
                  <div className="flex justify-center align-middle mt-2  items-center">
                    <img src={export_1} alt="" className="w-full md:w-[80%]" />
                  </div>
                </div>
                <div className="flex flex-row md:flex-row gap-4 md:gap-6 rounded-md p-2 md:pl-6 md:pr-6 md:pt-3 md:pb-3 bg-[#FFFFFF0D] bg-opacity-5 ">
                  <div className="flex justify-center items-center align-middle">
                    <img
                      src={service4}
                      alt=""
                      className="w-[4rem] sm:w-[4rem] sm:h-[4rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] xl:w-[4rem] xl:h-[4rem]"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="md:text-[27px] lg:text-[27px] text-[20px] font-[600]">
                      Cross-Document Intelligence
                    </h3>
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#67687A] font-[400]">
                      Connect insights across multiple documents to identify
                      patterns and relationships automatically
                    </p>
                  </div>
                  <div className="flex justify-center mt-2 items-center">
                    <img src={export_1} alt="" className="w-full md:w-[80%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-2">
            <div className="flex flex-row gap-4 rounded-md p-2 bg-[#FFFFFF0D] bg-opacity-5">
              <div className="flex justify-center items-center">
                <img
                  src={service5}
                  alt=""
                  className="w-[4rem] sm:w-[4rem] sm:h-[4rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] xl:w-[4rem] xl:h-[4rem]"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h3 className="md:text-[27px] lg:text-[27px] text-[20px] font-[600]">
                  Adaptive Learning
                </h3>
                <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#67687A] font-[400]">
                  Our system continuously improves based on your feedback,
                  becoming more aligned with your needs
                </p>
              </div>
              <div className="flex justify-center mt-2 items-center">
                <img src={export_1} alt="" className="w-full md:w-[80%]" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-12 mb-10">
            <button className="bg-[#7214FF] px-6 py-2 rounded-2xl text-[12px]">
              Get Started
            </button>
            <button className="border border-[#1F1F1F] px-6 py-2 rounded-2xl text-[12px]">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <div className="home-container mt-[14rem] md:mt-0 lg:mt-0 xl:mt-0">
        <NewFooter />
      </div>
    </div>
  );
};

export default MoreFeatures;

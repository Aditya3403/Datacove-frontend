import React from "react";
import new_logo from "../assets/cove_logo.png";
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const NewFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-6 md:py-8 px-4 sm:px-6 md:px-10  mt-8 md:mt-[4rem]">
      <div className="mb-6 md:mb-14 font-[800] flex items-center gap-2 justify-center md:justify-start">
        <img
          src={new_logo}
          alt="Company Logo"
          className="h-10 md:h-10 spin-logo"
        />{" "}
        DATACOVE-AI
      </div>

      {/* Top Section with Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 border-b md:text-start text-center border-gray-700 pb-8 md:pb-12">
        {/* Products Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 md:mb-6  border-l-2 border-gray-500 border-opacity-30 pl-2">
            Products
          </h3>
          <ul className="space-y-3 md:space-y-4 text-gray-400 ml-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Api Documentation
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 md:mb-6 border-l-2 border-gray-500 border-opacity-30 pl-2">
            Company
          </h3>
          <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm ml-2">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Sign up
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 md:mb-6 border-l-2 border-gray-500 border-opacity-30 pl-2">
            Resources
          </h3>
          <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm ml-2">
            <li>
              <Link to={"/faqs"} className="hover:text-white transition-colors">
                Faq's
              </Link>
            </li>
            <li>
              <Link
                to={"/privacypolicy"}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to={"/termsandcondtion"}
                className="hover:text-white transition-colors"
              >
                Terms and Condition
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 md:mb-3">FOLLOW US</h3>
          <div className="flex space-x-4 text-gray-400 md:justify-start justify-center">
            <a
              href="https://www.facebook.com/datacoveai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-xl cursor-pointer hover:text-white transition-colors" />
            </a>
            <FaXTwitter className="text-xl cursor-pointer hover:text-white transition-colors" />
            <a
              href="https://www.instagram.com/datacove.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl cursor-pointer hover:text-white transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/company/datacoveai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-xl cursor-pointer hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm mt-4 gap-4">
        <p>© {year} Company</p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:space-x-4">
          <Link to={"/faqs"} className="hover:text-white transition-colors">
            FAQ'S
          </Link>
          <Link
            to={"/termsandcondtion"}
            className="hover:text-white transition-colors"
          >
            Terms and condition
          </Link>
          <Link
            to={"/privacypolicy"}
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="cursor-pointer hover:text-white transition-colors">
            English ▼
          </span>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;

import React, { useState, useEffect } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import Footer from "../Footer/Footer";
import hero from "../assets/hero-bg.png";
import insta from "../assets/insta.png";
import x from "../assets/x.png";
import link from "../assets/link.png";

const Contact = () => {
  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init("LQzQ5Wq6NWU_oVEUC");
  }, []);

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState({
    number: "",
    countryCode: "",
    countryName: "",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    field: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneNumber = (value, country) => {
    setPhoneNumber({
      number: value,
      countryCode: country.dialCode,
      countryName: country.name,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      from_country: phoneNumber.countryName || "Not specified",
      phone_number: phoneNumber.number || "Not provided",
      field: formData.field || "Not selected",
      subject: selectedSubject || "General Inquiry",
      message: formData.message,
      to_name: "DatacoveAI",
    };

    try {
      const response = await emailjs.send(
        "service_sr8tcxi", // Your EmailJS service ID
        "template_e38eucg", // Your EmailJS template ID
        templateParams,
        "LQzQ5Wq6NWU_oVEUC" // Your EmailJS public key
      );

      console.log("Email sent successfully:", response);
      toast.success("Message sent successfully!");
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        field: "",
        message: "",
      });
      setPhoneNumber({
        number: "",
        countryCode: "",
        countryName: "",
      });
      setSelectedSubject(null);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(`Failed to send message: ${error.text || "Please try again"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="home-container">
        <img
          src={hero}
          alt="Background"
          className="absolute top-0 left-0 w-full h-auto -z-40"
        />
        
        <div className="flex justify-center items-center flex-col mt-36">
          <h1 className="font-[700] text-[48px] bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>

        <div className="w-full min-h-[60vh] mt-14 p-4 mb-14 flex flex-col md:flex-row justify-between gap-4 gradient-border bg-[#FFFFFF1A] bg-opacity-10">
          {/* Contact Information Section */}
          <div className="md:w-[40%] bg-[#FFFFFF1A] bg-opacity-10 rounded-xl p-6 flex flex-col justify-between mt-[5rem] h-full">
            <div>
              <h3 className="text-[36px] text-[700] font-beVietnam font-bold mb-6">
                Contact Information
              </h3>
              <div className="flex flex-col gap-6 mb-6">
                <div className="flex gap-4 items-center font-beVietnam font-bold">
                  <Mail className="min-w-[24px]" />
                  <p className="text-[14px]">info@datacove.ai</p>
                </div>
                <div className="flex gap-4 items-center font-beVietnam font-bold">
                  <MapPin className="min-w-[24px]" />
                  <p className="text-[14px]">357 Bay St., Toronto, ON M5H 4A6</p>
                </div>
                <div className="flex gap-4 items-center">
                  <Phone className="h-6 w-6 min-w-[24px]" /> 
                  <p>+1 9052915453</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <img src={insta} alt="Instagram" className="h-8 w-8" />
              <img src={x} alt="Twitter" className="h-8 w-8" />
              <img src={link} alt="LinkedIn" className="h-8 w-8" />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="md:w-[60%] mt-[5rem] flex flex-col h-auto">
            <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6 w-full">
                {/* Left Column */}
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                  <div className="flex flex-col">
                    <label className="font-beVietnam text-[16px] mb-2">
                      Full Name *
                    </label>
                    <input
                      value={formData.fullName}
                      name="fullName"
                      type="text"
                      onChange={handleChange}
                      required
                      className="bg-inherit border-b border-[#FFFFFF] h-9 text-sm focus:outline-none w-full"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-beVietnam text-[16px] mb-2">
                      Field *
                    </label>
                    <select
                      name="field"
                      value={formData.field}
                      onChange={handleChange}
                      required
                      className="bg-inherit border-b h-9 text-sm focus:outline-none w-full"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Legal">Legal</option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Real Estate">Real Estate</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                  <div className="flex flex-col">
                    <label className="font-beVietnam text-[16px] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                      required
                      className="bg-inherit border-b h-9 text-sm focus:outline-none w-full"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <label className="font-beVietnam text-[16px] mb-2">
                      Phone:
                    </label>
                    <PhoneInput
                      country={"ca"}
                      value={phoneNumber.number}
                      onChange={handlePhoneNumber}
                      inputProps={{ name: "phone" }}
                      containerStyle={{
                        backgroundColor: "inherit",
                      }}
                      inputStyle={{
                        backgroundColor: "inherit",
                        borderBottom: "1px solid white",
                        width: "100%",
                        color: "white",
                      }}
                      dropdownStyle={{
                        backgroundColor: "#1a1a1a",
                        color: "white",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[16px] text-[600] font-beVietnam">
                  Select Subject?
                </h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedSubject === "Request a Demo"}
                      onChange={() =>
                        setSelectedSubject(
                          selectedSubject === "Request a Demo"
                            ? null
                            : "Request a Demo"
                        )
                      }
                      className="appearance-none border-2 border-[#7214FF] rounded-full w-5 h-5 checked:bg-[#7214FF] checked:border-[#7214FF] focus:outline-none"
                    />
                    <p className="text-[15px]">Request a demo?</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedSubject === "Brand Identity"}
                      onChange={() =>
                        setSelectedSubject(
                          selectedSubject === "Brand Identity"
                            ? null
                            : "Brand Identity"
                        )
                      }
                      className="appearance-none border-2 border-[#7214FF] rounded-full w-5 h-5 checked:bg-[#7214FF] checked:border-[#7214FF] focus:outline-none"
                    />
                    <p className="text-[15px]">Brand Identity</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="font-beVietnam text-[16px]">Message *</label>
                <textarea
                  value={formData.message}
                  placeholder="Write your message"
                  name="message"
                  onChange={handleChange}
                  required
                  className="bg-inherit border-b w-full h-24 text-sm focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#7214FF] px-6 py-3 rounded-2xl text-[12px] hover:bg-[#5a10cc] transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
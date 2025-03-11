import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../assets/cove_logo.png";
import { NavLink } from "react-router-dom";
import useAppStore from "../store/useAppStore";
import SignUpPage from "../Pages/SignUpPage";
import { CircleUserRound } from "lucide-react";
const Navbar = () => {
  const { isSignUpOpen, openSignUp, user, logout } = useAppStore();
  // console.log("USER_NAME", user.name);
  const [dashboarPopup, setDashboardPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-3 z-50 bg-black home-container">
      {/* Logo */}
      <div className="text-[20px] font-bold cursor-pointer">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="w-10 spin-logo" /> DATACOVE-AI
          </div>
        </Link>
      </div>

      {/* Hamburger Icon (Visible on small screens) */}
      <div className="lg:hidden absolute right-5 flex justify-center align-middle items-center cursor-pointer z-50">
        {user ? (
          <div className="flex justify-center items-center gap-2 relative">
            <CircleUserRound
              size={30}
              onClick={toggleMenu}
              className="cursor-pointer text-white"
            />{" "}
            <p>{user.name}</p>
          </div>
        ) : (
          <RxHamburgerMenu
            size={30}
            className="cursor-pointer text-white"
            onClick={toggleMenu}
          />
        )}
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-[50px] left-0 w-full h-screen bg-black lg:flex lg:static lg:w-auto lg:items-center lg:gap-8 lg:bg-transparent lg:h-auto`}
      >
        <div className="flex flex-col gap-4 p-5 lg:flex-row lg:p-0 lg:gap-8 text-gray-400 text-[12px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer hover:text-white ${
                isActive
                  ? "text-white underline decoration-[white] underline-offset-[10px]"
                  : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/morefeatures"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `cursor-pointer hover:text-white ${
                isActive
                  ? " text-white underline decoration-[white] underline-offset-[10px] "
                  : ""
              }`
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `cursor-pointer hover:text-white ${
                isActive
                  ? "text-white underline decoration-[white] underline-offset-[10px]"
                  : ""
              }`
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/career"
            className={({ isActive }) =>
              `cursor-pointer hover:text-white ${
                isActive
                  ? "text-white underline decoration-[white] underline-offset-[10px]"
                  : ""
              }`
            }
          >
            Career
          </NavLink>

          <NavLink
            to="/contact-us"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `cursor-pointer hover:text-white ${
                isActive
                  ? "text-white underline decoration-[white] underline-offset-[10px]"
                  : ""
              }`
            }
          >
            Contact Us
          </NavLink>
          {/* Login Button in the Sidebar (for Mobile) */}
          <div className="lg:hidden mt-4 border border-[#7214FF] rounded-lg">
            {user ? (
              <>
                <button
                  className="w-full px-4 py-2 text-white rounded-2xl hover:bg-[#7214FF]"
                  onClick={() => {
                    openSignUp();
                    toggleMenu();
                  }}
                >
                  Open Dashboard
                </button>
              </>
            ) : (
              <button
                className="w-full px-4 py-2 text-white rounded-2xl hover:bg-[#7214FF]"
                onClick={() => {
                  openSignUp();
                  toggleMenu();
                }}
              >
                LOGIN
              </button>
            )}
          </div>
          {user && (
            <div className="lg:hidden mt-4 border border-[#7214FF] rounded-lg">
              <button
                className="w-full px-4 py-2 text-white rounded-2xl hover:bg-[#7214FF]"
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Demo Button for Desktop */}
      <div className="hidden lg:block text-[20px] font-bold relative">
        {user ? (
          <div className="relative">
            <div
              className="flex justify-center items-center gap-4 cursor-pointer"
              onClick={() => setDashboardPopup(!dashboarPopup)}
            >
              <CircleUserRound
                size={30}
                className="cursor-pointer text-white"
              />
              <p>{user.name}</p>
            </div>

            {/* Dropdown Menu */}
            {dashboarPopup && (
              <div className="absolute right-0 mt-2 w-52 bg-[#060b27] text-white flex flex-col justify-center border border-[#7214FF]  text-sm font-[400] rounded-lg shadow-lg p-2 z-50">
                <Link to={user ? `/dashboard/${user.name}` : "/"}>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[#7214FF] hover:rounded-md"
                    onClick={() => {
                      setDashboardPopup(false);
                    }}
                  >
                    Open Dashboard
                  </button>
                </Link>

                <button
                  className="block w-full text-left px-4 py-2 hover:bg-[#7214FF] hover:rounded-md"
                  onClick={() => {
                    logout();
                    setDashboardPopup(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="px-4 py-2 text-white rounded-2xl hover:bg-[#7214FF]"
            onClick={openSignUp}
          >
            LOGIN
          </button>
        )}
      </div>

      {/* SignUpPage component */}
      {isSignUpOpen && <SignUpPage />}
    </div>
  );
};

export default Navbar;

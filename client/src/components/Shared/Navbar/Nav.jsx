import { useState } from "react";

import useAuth from "./../../../hooks/useAuth";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import NavLinkk from "../Link/NavLinkk";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);

  const { user, logOut } = useAuth(); // Access user directly
  const { photoURL, email, displayName } = user || {}; // Ensure user is defined

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  const handleLogout = async () => {
    try {
      logOut();
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error("Failed to Logout");
    }
  };

  return (
    <nav className="color2b top-0 left-0 w-full bg-transparent bg-blue-gray-600 border-gray-200 dark:bg-gray-900 z-10">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="../../../../public/logo.png"
            className="h-14"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 ml-28"
            id="user-menu-button"
            aria-expanded={isDropdownOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={photoURL || "../../../../public/person.png"}
              alt="user photo"
            />
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute z-50 rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm ${
              isDropdownOpen ? "block" : "hidden"
            }`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {displayName}
              </span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {user ? (
                <>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <i className="fas fa-tachometer-alt mr-2"></i>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <i className="fas fa-cog mr-2"></i>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <i className="fas fa-dollar-sign mr-2"></i>
                      Earnings
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <Link
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    to={"/login"}
                  >
                    <FaSignInAlt className="mr-2" />{" "}
                    {/* FontAwesome icon for Log In */}
                    Log In
                  </Link>

                  <Link
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    to={"/signup"}
                  >
                    <FaUserPlus className="mr-2" />{" "}
                    {/* FontAwesome icon for Sign Up */}
                    Sign Up
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg block md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded={isDropdownOpen1 ? "true" : "false"}
          onClick={toggleDropdown1}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div
          className={`items-center justify-between ${
            isDropdownOpen1 ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-4 borderrounded-lg text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 "
            id="primary"
          >
            <li>
              <NavLinkk title={"Home"} address={"/login"}></NavLinkk>
            </li>
            <li>
              <NavLinkk title={"About"} address={"/about"}></NavLinkk>
            </li>
            <li>
              <NavLinkk title={"Services"} address={"/services"}></NavLinkk>
            </li>
            <li>
              <NavLinkk title={"Projects"} address={"/projects"}></NavLinkk>
            </li>
            <li>
              <NavLinkk title={"News"} address={"/news"}></NavLinkk>
            </li>
            <li>
              <NavLinkk title={"Shop"} address={"/shop"}></NavLinkk>
            </li>
            <li>
              <NavLinkk title={"Contact"} address={"/contact"}></NavLinkk>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

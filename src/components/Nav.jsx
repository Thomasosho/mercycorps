import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import options from "../data/option.json";
import BodyContent from "./BodyContent";
import ModalLogin from "./ModalLogin";
import ModalSignUp from "./ModalSignUp";
import { useAuth } from "../contexts/AuthContext";
import ModalProfile from "./ModalProfile";

const Nav = () => {
  const location = useLocation();
  const { pathname } = location;
  // eslint-disable-next-line
  const splitLocation = pathname.split("/");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.label === "Mercy Corps Tenders")
  );
  const [selectedSubOption, setSelectedSubOption] = useState(
    options.find((option) => option.label === "Mercy Corps Tenders")
      ?.subOptions[0]
  );

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedSubOption(option.subOptions[0]);
    setShowDropdown(false);
  };

  const handleSubOptionClick = (subOption) => {
    setSelectedSubOption(subOption);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openProfileModal = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const profile = () => {
    openProfileModal();
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="bg-white p-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={Logo} alt="Logo" className="h-8 mr-4" />
        </div>

        <div className="relative mb-4 md:mb-0">
          <button
            className="text-[#E64646] hover:text-[#ff4343] focus:outline-none bg-red-100 px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {selectedOption.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#E64646"
              className={`ml-2 transition-transform transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            >
              <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
          <div
            className={`absolute bg-red-100 w-48 mt-2 rounded-md shadow-lg z-10 ${
              showDropdown ? "block" : "hidden"
            }`}
          >
            <div className="py-1">
              {options.map((option) => (
                <div key={option.id}>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center">
            <div className="flex items-center relative">
              <button className="rounded-md text-[#E64646] px-4 py-2 mr-4 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#E64646"
                  className={`ml-2 transition-transform transform ${
                    showProfileDropdown ? "rotate-180" : ""
                  }`}
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                >
                  <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                </svg>
                <div
                  className={`absolute right-0 mt-10 w-28 bg-red-100 rounded-md shadow-lg ${
                    showProfileDropdown ? "block" : "hidden"
                  }`}
                >
                  <button
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={() => {
                      profile();
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log out
                  </button>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <button onClick={openLoginModal} className="text-[#E64646] mr-4">
              Login
            </button>
            <button
              onClick={openSignUpModal}
              className="text-white bg-[#E64646] hover:bg-[#e93a3a] rounded-md px-4 py-2"
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      <div className="bg-gray-200 p-4 flex flex-wrap justify-center">
        {selectedOption.subOptions.map((subOption) => (
          <button
            key={subOption}
            className={`${
              subOption === selectedSubOption
                ? "bg-red-200"
                : "bg-white hover:bg-gray-300"
            } rounded-md px-4 py-2 m-2 text-[#E64646]`}
            onClick={() => handleSubOptionClick(subOption)}
          >
            {subOption}
          </button>
        ))}
      </div>

      {showLoginModal ? (
        <ModalLogin isOpen={showLoginModal} onClose={closeLoginModal} />
      ) : null}
      {showSignUpModal ? (
        <ModalSignUp isOpen={showSignUpModal} onClose={closeSignUpModal} />
      ) : null}
      {showProfileModal ? (
        <ModalProfile isOpen={showProfileModal} onClose={closeProfileModal} />
      ) : null}

      <BodyContent selectedSubOption={selectedSubOption} />
    </>
  );
};

export default Nav;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../images/logo.png";
import options from "../data/option.json";
import BodyContent from "./BodyContent";

const Nav = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.label === "Mercy Corps Tenders")
  );
  const [selectedSubOption, setSelectedSubOption] = useState(
    options.find((option) => option.label === "Mercy Corps Tenders")
      ?.subOptions[0]
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedSubOption(option.subOptions[0]);
    setShowDropdown(false);
  };

  const handleSubOptionClick = (subOption) => {
    setSelectedSubOption(subOption);
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
            className={`absolute bg-red-100 w-48 mt-2 rounded-md shadow-lg ${
              showDropdown ? "block" : "hidden"
            }`}
          >
            <div className="py-1">
              {options.map((option) => (
                <div key={option.id}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <button className="text-[#E64646] mr-4">Login</button>
          <button className="text-white bg-[#E64646] hover:bg-[#e93a3a] rounded-md px-4 py-2">
            Sign Up
          </button>
        </div>
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

      <BodyContent selectedSubOption={selectedSubOption} />
    </>
  );
};

export default Nav;

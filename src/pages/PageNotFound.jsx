import React from "react";
import { Link } from "react-router-dom";
import NotFoundImg from "../images/404.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PageNotFound = () => {
  return (
    <section
      id="pricing"
      className="h-[100vh] flex items-center flex-col justify-center py-10 lg:py-32 px-8 md:px-16 w-full transition duration-150"
    >
      <div className=" text-center">
        {/* <img className='w-[350px] pb-4 mx-auto' src={NotFoundImg} alt="PageNotFound" srcset="" /> */}
        <LazyLoadImage
          className="w-[350px] pb-4 mx-auto"
          style={{ objectFit: "cover" }}
          effect="blur"
          alt="PageNotFound"
          title={NotFoundImg}
          src={NotFoundImg}
        />
        <h1 className="text-center font-medium text-[35px] lg:text-[70px]">
          Page Not Found
        </h1>

        <Link to="/">
          <button className="text-[20px] tracking-wide leading-[19.2px] font-[600] hover:bg-[#00F457] bg-[#045446] text-white hover:text-white py-4 px-14 rounded-sm">
            Home{" "}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;

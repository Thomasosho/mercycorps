import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-400 text-white p-4 text-center">
      <div className="container mx-auto">
        <p>&copy; {currentYear} Mercy Corps Tender. All Rights Reserved. By <Link to={'https://osho.ng'} target="_blank" className=" underline">James Osho Thomas</Link></p>
        <nav className="mt-2">
          <Link to="https://www.mercycorps.org/who-we-are/our-team" target="_blank" className="text-white mx-2 hover:underline">
            Who We Are |
          </Link>
          <Link to="https://www.mercycorps.org/what-we-do/emergency-response" target="_blank" className="text-white mx-2 hover:underline">
            What We Do |
          </Link>
          <Link to="https://www.mercycorps.org/donate/become-monthly-giver" target="_blank" className="text-white mx-2 hover:underline">
            How To Help
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

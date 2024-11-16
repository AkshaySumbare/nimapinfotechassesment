import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import "./header.css";
export const Header = () => {
  return (
    <>
      <Navbar>
        <div className=" bg-slate-500 w-screen  h-16  p-3 text-white text-1xl font-semibold flex justify-evenly ">
          <Link to={"/"} className="hover:text-blue-300">
            Home
          </Link>
          <Link to={"/toprating"} className="hover:text-blue-300">
            Top rated
          </Link>

          <Link to={"/upcomming"} className="hover:text-blue-300">
            Upcomming
          </Link>
          
        </div>
      </Navbar>
    </>
  );
};

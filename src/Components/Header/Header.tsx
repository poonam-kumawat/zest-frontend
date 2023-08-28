import { useState } from "react";
import "./Header.css";
import dropdownArrow from "../../Assets/Icons/dropdown-arrow-icon.svg";
import searchIcon from "../../Assets/Icons/search-icon.svg";
import cartIcon from "../../Assets/Icons/cart-icon.svg";
import menuIcon from "../../Assets/Icons/menu-icon.svg";

const Header = () => {
  // for mobile menu bar
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className=" p-4 bg-[#ffffff] flex gap-5 shadow-lg grid-rows-3 justify-between  mx-auto  flex-wrap  md:flex lg:flex">
        <div className="flex">
          <div className="text-2xl font-semibold text-[#4DBD7A] px-10 ">
            Zest
          </div>
          <div className="text-lg font-medium text-[#1F2937] px-10 py-1  verticalLine hidden lg:flex md:flex">
            Location
            <img
              className="mx-4 my-1"
              src={dropdownArrow}
              alt="fruit"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="relative hidden lg:flex md:flex">
          <input
            type="text"
            className="border border-[#B8C6C3] p-1 shadow-sm w-96 px-5 outline-[#B8C6C3] rounded"
            placeholder="Search Vegetables and Fruits"
          ></input>
          <img
            className="mx-4 my-1 absolute right-0 top-0 mt-2"
            src={searchIcon}
            alt="fruit"
            width={20}
            height={20}
          />
        </div>
        <div className="hidden lg:flex ">
          <img
            className="mx-10 my-1"
            src={cartIcon}
            alt="fruit"
            width={30}
            height={30}
          />
          <button className="bg-[#4DBD7A] text-[#ffffff] font-medium text-lg rounded-lg py-1 px-8">
            login
          </button>
        </div>
        <div>
          <img
            className="lg:hidden"
            src={menuIcon}
            alt="fruit"
            width={30}
            height={30}
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>
      </div>
      {show && (
        <div className="lg:hidden m-3 ">
          <nav className="p-2">
            <ul className="">
              <li className="border-2 text-lg font-medium text-[#B8C6C3] p-2 rounded text-center m-2  md:hidden lg:hidden hover:text-[#4DBD7A]">
                <div className="relative lg:flex md:flex">
                  <input
                    type="text"
                    className="border border-[#B8C6C3] p-1 shadow-sm w-96 px-5 outline-[#4DBD7A] rounded "
                    placeholder="Search Vegetables and Fruits"
                  ></input>
                  <img
                    className="mx-4 my-1 absolute right-0 top-0 mt-2"
                    src={searchIcon}
                    alt="fruit"
                    width={20}
                    height={20}
                  />
                </div>
              </li>
              <li className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2  md:hidden lg:hidden">
                Location
              </li>
              <li className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2">
                Cart
              </li>
              <li className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2">
                Login
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
export default Header;

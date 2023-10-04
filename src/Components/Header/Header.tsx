import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";

const Header = () => {
  // for mobile menu bar
  const [show, setShow] = useState(false);
  // for location popover
  const [showLocation, setShowLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState<any>("");
  // for cart popover
  const [showCart, setShowCart] = useState(false);
  const locationRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (event: any) => {
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocation(!showLocation);
    }
  };

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    navigate({
      pathname: "category",
      search: createSearchParams({
        search: searchQuery,
      }).toString(),
    });
  };

  useEffect(() => {
    if (showLocation) {
      document.addEventListener("click", handleClickOutside, true);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showLocation]);

  return (
    <div className="sticky top-0 z-50">
      <div className=" p-4 bg-[#ffffff] flex gap-5 shadow-lg grid-rows-3 justify-between mx-auto flex-wrap md:flex lg:flex">
        <div className="flex">
          <div
            onClick={() => {
              navigate(`/`);
            }}
            className="text-2xl font-semibold text-[#4DBD7A] px-10 cursor-pointer"
          >
            Zest
          </div>

          <div
            className="text-lg font-medium text-[#1F2937] px-10 py-1  verticalLine hidden lg:flex md:flex cursor-pointer"
            onClick={() => {
              setShowCart(false)
              setShowLocation(!showLocation);
            }}
          >
            Location
            <img
              className="mx-4 my-1"
              src="/assets/icons/dropdown-arrow-icon.svg"
              alt="dropdown-arrow"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="relative hidden lg:flex md:flex">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="border border-[#B8C6C3] p-1 shadow-sm w-96 px-5 outline-[#B8C6C3] rounded"
              placeholder="Search Vegetables and Fruits"
              value={searchQuery}
              onChange={(e) => handleChange(e)}
              required
            ></input>
          </form>
          <img onClick={(e)=>{handleSubmit(e)}}
            className="mx-4 my-1 absolute right-0 top-0 mt-2 cursor-pointer"
            src="/assets/icons/search-icon.svg"
            alt="search"
            width={20}
            height={20}
          />
        </div>
        <div className="hidden lg:flex">
          <img
            className="mx-10 my-1 cursor-pointer"
            src="/assets/icons/cart-icon.svg"
            alt="cart"
            width={30}
            height={30}
            onClick={() => {
              setShowLocation(false)
              setShowCart(!showCart);
            }}
          />
          <button className="bg-[#4DBD7A] text-[#ffffff] font-medium text-lg rounded-lg py-1 px-8 cursor-pointer">
            Login
          </button>
        </div>
        <div className="lg:hidden cursor-pointer">
          <img
            src="/assets/icons/menu-icon.svg"
            alt="menu"
            width={30}
            height={30}
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>
      </div>
      {/* Mobile navbar */}
      {show && (
        <div className="lg:hidden m-3 ">
          <nav className="p-2">
            <ul className="">
              <li className="border-2 text-lg font-medium text-[#B8C6C3] p-2 rounded text-center m-2 md:hidden lg:hidden hover:text-[#4DBD7A]">
                <div className="relative lg:flex md:flex">
                  <input
                    type="text"
                    className="border border-[#B8C6C3] p-1 shadow-sm px-5 outline-[#4DBD7A] rounded w-full "
                    placeholder="Search Vegetables and Fruits"
                  ></input>
                  <img
                    className="mx-4 my-1 absolute right-0 top-0 mt-2 cursor-pointer"
                    src="/assets/icons/search-icon.svg"
                    alt="search"
                    width={20}
                    height={20}
                  />
                </div>
              </li>
              <li
                className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2 md:hidden lg:hidden cursor-pointer"
                onClick={() => {
                  if (show) setShow(false);
                  setShowLocation(!showLocation);
                }}
              >
                Location
              </li>
              <li
                className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2 cursor-pointer"
                onClick={() => {
                  setShowCart(!showCart);
                }}
              >
                Cart
              </li>
              <li className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2 cursor-pointer">
                Login
              </li>
            </ul>
          </nav>
        </div>
      )}
      {/* Location Popover */}
      {showLocation && (
        <div className="bg-[#333333] bg-opacity-70 p-4 md:p-10 md:justify-center h-full fixed z-50 w-full">
          <div
            className=" bg-[#FFFFFF] text-[#000]  rounded-lg p-10 md:w-4/5 h-fit max-w-3xl lg:max-h-44 "
            ref={locationRef}
          >
            <div className="flex pb-8 font-md text-lg">
              <img
                className="mx-10"
                src="/assets/icons/location-icon.svg"
                alt="location"
                width={30}
                height={30}
              />
              To deliver as quickly as possible, we would like your current
              location
            </div>
            <div className="block justify-center lg:flex">
              <div className="relative me-4 ">
                <input
                  type="text"
                  className="border border-[#B8C6C3] py-2 w-full lg:w-96 shadow-sm  px-5 outline-[#B8C6C3] rounded"
                  placeholder="Search delivery location"
                ></input>
                <img
                  className="mx-4 my-1 absolute right-0 top-0 mt-3 cursor-pointer"
                  src="/assets/icons/search-icon.svg"
                  alt="search"
                  width={20}
                  height={20}
                />
              </div>
              <div className="my-2 text-center">or</div>
              <div className="ps-4 relative">
                <img
                  className="mx-2 my-3 absolute right-100 top-0 "
                  src="/assets/icons/location-marker-icon.svg"
                  alt="location-marker"
                  width={25}
                  height={25}
                />
                <button className="bg-[#4DBD7A] text-[#ffffff] text-sm rounded-lg py-3 ps-10 pe-5 w-full">
                  Use Current Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Cart Popover */}
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
    </div>
  );
};
export default Header;

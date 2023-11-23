import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import SignIn from "../SignIn/signIn";

import Location from "../Location/Location";

const Header = () => {
  // for mobile menu bar
  const [show, setShow] = useState(false);
  // for location popover
  const [showLocation, setShowLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState<any>("");
  // for cart popover
  const [showCart, setShowCart] = useState(false);
  const locationRef = useRef<HTMLInputElement>(null);
  const SignInRef = useRef<HTMLInputElement>(null);
  const [showSignIn, setshowSignIn] = useState(false);
  const { accessToken } = useSelector((state: rootType) => state.user);
  const { cartTotalCount } = useSelector((state: rootType) => state.cart);
  const navigate = useNavigate();
  const { deliveryLocation } = useSelector((state: rootType) => state.location);
  const handleClickOutside = (event: any) => {
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocation(!showLocation);
    } else if (SignInRef.current && !SignInRef.current.contains(event.target)) {
      setshowSignIn(!showSignIn);
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
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
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
    <div className="sticky top-0 z-50 bg-[#ffffff] min-w-[275px]">
      <div className="grid grid-cols-2 md:grid-cols-3  p-4 mx-auto shadow-lg">
        <div className="flex">
          <div
            onClick={() => {
              navigate(`/`);
            }}
            className="text-2xl font-semibold text-[#4DBD7A] px-1 sm:px-8 cursor-pointer"
          >
            Zest
          </div>

          <div
            className="text-lg font-medium text-[#1F2937] px-5 py-1  verticalLine hidden lg:flex  cursor-pointer"
            onClick={() => {
              if (showCart) setShowCart(false);
              setShowLocation(!showLocation);
            }}
          >
            {!deliveryLocation ? (
              <>
                <p>Location</p>
                <img
                  className="mx-4 my-1"
                  src="/assets/icons/dropdown-arrow-icon.svg"
                  alt="dropdown-arrow"
                  width={15}
                  height={15}
                />
              </>
            ) : (
              <>
                <p>{deliveryLocation}</p>
                <img
                  className="mx-4 my-1"
                  src="/assets/icons/dropdown-arrow-icon.svg"
                  alt="dropdown-arrow"
                  width={15}
                  height={15}
                />
              </>
            )}
          </div>
        </div>
        <div className="relative hidden lg:flex md:flex place-self-center">
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
          <img
            onClick={(e) => {
              handleSubmit(e);
            }}
            className="mx-4 my-1 absolute right-0 top-0 mt-2 cursor-pointer"
            src="/assets/icons/search-icon.svg"
            alt="search"
            width={20}
            height={20}
          />
        </div>
        <div className="flex place-self-end">
          <div className="relative">
            <p className="badge bg-[#4DBD7A] text-[#ffffff] rounded-[50px] absolute right-9 top-0 text-[10px] m-0 px-[5px] ">
              {cartTotalCount}
            </p>
            <img
              className="mx-2 lg:mx-10 my-1 cursor-pointer "
              src="/assets/icons/cart-icon.svg"
              alt="cart"
              width={30}
              height={30}
              onClick={() => {
                if (showLocation) setShowLocation(false);
                setShowCart(!showCart);
                setHidden();
              }}
            />
          </div>
          {!accessToken ? (
            <button
              onClick={() => setshowSignIn(!showSignIn)}
              className="bg-[#4DBD7A] text-[#ffffff] font-medium text-lg rounded-lg py-1 px-8 cursor-pointer hidden md:block"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              <img
                className="cursor-pointer"
                src="/assets/icons/profile-icon.svg"
                alt="profile"
                width={35}
                height={35}
              />
            </button>
          )}
          <div className="lg:hidden cursor-pointer my-auto px-2">
            <img
              src="/assets/icons/menu-icon.svg"
              alt="menu"
              width={30}
              height={30}
              onClick={() => {
                if (showCart) setShowCart(false);
                setShow(!show);
              }}
            />
          </div>
        </div>
      </div>
      {/* Mobile navbar */}
      {show && (
        <div className="lg:hidden bg-[#ffffff] border-t">
          <nav className="p-2">
            <ul className="text-[#ffffff]">
              <li className="border-0 text-lg font-medium text-[#B8C6C3] p-1 rounded text-center md:m-2 md:hidden lg:hidden hover:text-[#4DBD7A]">
                <div className="relative lg:flex md:flex">
                  <input
                    type="text"
                    className="border border-[#B8C6C3] p-1 shadow-sm px-5 outline-[#4DBD7A] rounded w-full hover:border-[#4DBD7A] hover:border-2"
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
                className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] rounded text-center p-1 lg:p-2 m-1 lg:m-2 lg:hidden cursor-pointer"
                onClick={() => {
                  if (show) setShow(false);
                  setShowLocation(!showLocation);
                }}
              >
                Location
              </li>
              {/* <li
                className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2 cursor-pointer"
                onClick={() => {
                  if (show) setShow(false);
                  setShowCart(!showCart);
                  if (show) setShow(false);
                }}
              >
                Cart
              </li> */}
              <li
                onClick={() => {
                  setshowSignIn(!showSignIn);
                  if (show) setShow(false);
                }}
                className="border-2 text-lg font-medium text-[#B8C6C3] hover:border-[#4DBD7A] hover:text-[#4DBD7A] p-2 rounded text-center m-2 cursor-pointer  md:hidden"
              >
                Login
              </li>
            </ul>
          </nav>
        </div>
      )}
      {/* Location Popover */}
      {showLocation && (
        <Location locationRef={locationRef} setShowLocation={setShowLocation} />
      )}
      {/* Cart Popover */}
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
      {showSignIn && (
        <SignIn SignInRef={SignInRef} setshowSignIn={setshowSignIn} />
      )}
    </div>
  );
};
export default Header;

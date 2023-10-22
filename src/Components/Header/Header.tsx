import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { createSearchParams, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import Location from "../Location/Location";

const Header = () => {
  // for mobile menu bar
  const [show, setShow] = useState(false);
  // for location popover
  const [showLocation, setShowLocation] = useState(false);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [deliveryLocation, setdeliveryLocation] = useState("");
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
  const setHidden = () => {
    console.log(document.body.style.overflow);
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
  const { cartTotalCount } = useSelector((state: rootType) => state.cart);

  return (
    <div className="sticky top-0 z-50 bg-[#ffffff]">
      <div className=" p-4 flex gap-5 shadow-lg grid-rows-3 justify-between mx-auto flex-wrap md:flex lg:flex">
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
              <p>{deliveryLocation}</p>
            )}
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
        <div className="hidden lg:flex">
          <div className="relative">
            <p className="badge bg-[#4DBD7A] text-[#ffffff] rounded-[50px] absolute right-9 top-0 text-[10px] m-0 px-[5px] text-center ">
              {cartTotalCount}
            </p>
            <img
              className="mx-10 my-1 cursor-pointer "
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
              if (showCart) setShowCart(false);
              setShow(!show);
              if (showCart) setShowCart(false);
            }}
          />
        </div>
      </div>
      {/* Mobile navbar */}
      {show && (
        <div className="lg:hidden bg-[#ffffff] border-t">
          <nav className="p-2">
            <ul className="text-[#ffffff]">
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
                  if (show) setShow(false);
                  setShowCart(!showCart);
                  if (show) setShow(false);
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
        <Location
          locationRef={locationRef}
          setShowLocation={setShowLocation}
          setdeliveryLocation={setdeliveryLocation}
        />
      )}
      {/* Cart Popover */}
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
    </div>
  );
};
export default Header;

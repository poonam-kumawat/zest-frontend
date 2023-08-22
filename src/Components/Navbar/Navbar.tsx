import "./Navbar.css";

const Navbar = () => {
  return (
    <div className=" p-4 bg-[#ffffff] flex gap-5 shadow-lg grid-rows-3 justify-between">
      <div className="flex">
        <div className="text-2xl font-semibold text-[#4DBD7A] px-10  verticalLine ">
          Zest
        </div>
        <div className="text-lg font-medium text-[#1F2937] px-10 py-1 flex">
          Location
          <img
            className="mx-4 my-1"
            src="/assets/icons/dropdown-arrow-icon.svg"
            alt="fruit"
            width={15}
            height={15}
          />
        </div>
      </div>
      <div className="relative">
        <input
          type="text"
          className="border border-[#B8C6C3] p-1 shadow-sm w-96 px-5 "
          placeholder="Search Vegetables and Fruits"
        ></input>
        <img
          className="mx-4 my-1 absolute right-0 top-0 mt-2"
          src="/assets/icons/search-icon.svg"
          alt="fruit"
          width={20}
          height={20}
        />
      </div>
      <div className="flex">
        <img
          className="mx-10 my-1"
          src="/assets/icons/cart-icon.svg"
          alt="fruit"
          width={30}
          height={30}
        />
        <button className="bg-[#4DBD7A] text-[#ffffff] font-medium text-lg rounded-lg py-1 px-8">
          login
        </button>
      </div>
    </div>
  );
};
export default Navbar;

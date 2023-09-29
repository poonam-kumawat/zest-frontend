import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Cart = ({
  setShowCart,
  showCart,
}: {
  setShowCart: any;
  showCart: any;
}) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <div className="bg-[#333333] bg-opacity-70  h-full fixed z-50 w-full grid place-content-end">
      <div className="bg-[#F6F6F6] text-[#000]  h-screen bg-[#E4E4E4]">
        <div className="flex justify-between border-b border-slate-400 ">
          <div className="text-[#1F2937] text-2xl font-semibold my-2 mx-6">
            My Cart
          </div>
          <div className="text-[#656565] text-sm m-4 ">Item Count : 1</div>
        </div>
        <div
          className=" -ms-14 -mt-12"
          onClick={() => {
            setShowCart(!showCart);
          }}
        >
          <img
            width={50}
            height={50}
            src="/assets/icons/close-button.svg"
            alt="close"
          />
        </div>
        {/* Empty Cart message */}
        {/* <div className=" pt-60 font-semibold text-lg mx-8">
          No item added to cart. Add now
        </div> */}

        {/* Product Cart */}
        <div className="card cursor-pointer m-2 gap-4 rounded p-2 flex justify-center bg-[#ffffff] ">
          <img
            className="mx-4 my-auto"
            src={"/assets/images/cherry.svg"}
            alt="fruit"
            width={80}
            height={80}
            // onClick={() => {
            //   // navigate(``);
            // }}
          />
          <div className="pr-14">
            <div className="name">
              <p
                className="text-base font-semibold my-2"
                // onClick={() => {
                //   // navigate(``);
                // }}
              >
                Cherry
              </p>
            </div>

            <div className="flex w-full flex-row justify-between py-2">
              <p className="text-sm text-[#656565] pr-12">MRP : Rs. 50</p>
              <p className="text-sm text-[#656565]"> (4 pieces)</p>
            </div>

            <div className="w-full flex flex-row p-1 rounded bg-[#4DBD7A] h-7">
              {quantity >= 1 && (
                <button className="flex items-center justify-center bg-[#268462] rounded">
                  <img src="/assets/icons/minus-icon.svg" alt="add" />
                </button>
              )}
              <p className="mx-auto -my-0.5 font-semibold text-white text-center ">
                {quantity > 0 ? quantity : "Add"}
              </p>
              <button className="float-right w-5 h-5 flex items-center justify-center bg-[#268462] rounded">
                <img
                  width={15}
                  height={15}
                  src="/assets/icons/plus-icon.svg"
                  alt="add"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

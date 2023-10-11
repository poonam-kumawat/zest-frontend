import { useState } from "react";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";




const Cart = ({
  setShowCart,
  showCart,
}: {
  setShowCart: any;
  showCart: any;
}) => {
  const [quantity, setQuantity] = useState(0);
  const { cartTotalCount } = useSelector((state: rootType) => state.cart);
  const cartItems=useSelector((state:rootType)=>state.cart.productList);
  return (
    <div className="bg-[#333333] bg-opacity-70  h-full fixed z-50 w-full grid place-content-end translate-x-(100%) ease-out duration-300">
      <div className="bg-[#F6F6F6] text-[#000]  h-screen bg-[#E4E4E4]">
        <div className="flex justify-between border-b border-slate-400 ">
          <div className="text-[#1F2937] text-2xl font-semibold my-2 mx-6">
            My Cart
          </div>
          <div className="text-[#656565] text-sm m-4 ">Item Count : {cartTotalCount}</div>
        </div>
        <div
          className=" -ms-14 -mt-12"
          onClick={() => {
            setShowCart(!showCart);
          }}
        >
          <img
            className="cursor-pointer"
            width={50}
            height={50}
            src="/assets/icons/close-button.svg"
            alt="close"
          />
        </div>
        <div className="card cursor-pointer mx-2 my-4 gap-4 rounded p-2 flex justify-center bg-[#ffffff] shadow">
          <img
            className="mx-4 my-auto"
            src={"/assets/images/cherry.svg"}
            alt="fruit"
            width={80}
            height={80}
          />
          <div className="pr-14">
            <div className="name">
              <p className="text-base font-semibold my-2">Cherry</p>
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

        <div className="card mx-2 my-4 rounded px-4 py-2  bg-[#ffffff] text-[#1F2937] font-semibold shadow">
          <p className="text-xl font-semibold my-2 mx-6 ">Price Summary</p>
          <div className="flex w-full flex-row justify-between px-8 py-2 border-t border-slate-400 text-sm ">
            <p>Sub Total</p>
            <p> + 400 </p>
          </div>
          <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
            <p>Delivery Charges</p>
            <p className="pr-2"> + 40 </p>
          </div>
          <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
            <p> Grand Total</p>
            <p> + 440 </p>
          </div>
        </div>
        <div className="flex m-2 p-4 font-semibold text-[#656565]">
          <img
            className="mr-4"
            width={25}
            src="/assets/icons/info-icon.svg"
            alt="info"
          />
          <div className="text-left text-sm">
            Orders cancelled within 24 hrs of delivery won’t
            <br />
            be applicable for refund.In case of unexpected
            <br />
            delays, a refund will be provided, if applicable.
          </div>
        </div>
        <button className="w-5/6 rounded-lg bg-[#4DBD7A] h-10 mx-8 font-semibold text-white text-lg">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;

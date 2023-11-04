import { useDispatch, useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import { addProduct, removeProduct } from "../../Redux/reducer/cartReducer";
import { Link, useNavigate } from "react-router-dom";

const setVisible = () => {
  if (document.body.style.overflow !== "scroll") {
    document.body.style.overflow = "scroll";
  } else {
    document.body.style.overflow = "hidden";
  }
};
const Cart = ({
  setShowCart,
  showCart,
}: {
  setShowCart: any;
  showCart: any;
}) => {
  const dispatch = useDispatch();
  const { cartTotalCount, productList, countList, totalAmount } = useSelector(
    (state: rootType) => state.cart
  );

  const navigate = useNavigate();

  return (
    <div className="bg-[#333333]  bg-opacity-70 h-full fixed z-50 w-full grid place-content-end">
      <div className="bg-[#F6F6F6] text-[#000]  h-screen  overflow-scroll">
        <div className="flex justify-between border-b border-slate-400 ">
          <div className="text-[#1F2937] text-2xl font-semibold my-2 mx-6">
            My Cart
          </div>
          <div className="text-[#656565] text-sm m-4 ">
            Item Count : {cartTotalCount}
          </div>
        </div>
        <div
          className=" -ms-14 -mt-12 absolute"
          onClick={() => {
            setShowCart(!showCart);
            setVisible();
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
        {/* Empty Cart message */}
        {/* <div className=" pt-60 font-semibold text-lg mx-8">
          No item added to cart. Add now
        </div> */}
        {/* Product Cart */}
        {productList.length > 0 ? (
          <div>
            {productList.map((cartitem: any) => {
              return (
                <div
                  key={cartitem._id}
                  className="card cursor-pointer mx-3 my-4 gap-4 rounded  p-2 flex justify-center bg-[#ffffff] shadow"
                >
                  <img
                    className="mx-4 my-auto"
                    src={cartitem.imgUrl}
                    alt="fruit"
                    width={80}
                    height={80}
                  />
                  <div className="pr-14">
                    <div className="name">
                      <p className="text-base font-semibold my-2">
                        {cartitem.productName}
                      </p>
                    </div>
                    <div className="flex w-full flex-row justify-between py-2">
                      <p className="text-sm text-[#656565] pr-12">
                        {cartitem.price}
                      </p>
                      <p className="text-sm text-[#656565]">
                        {" "}
                        ({cartitem.availability})
                      </p>
                    </div>
                    <div className="w-full flex flex-row p-1 rounded bg-[#4DBD7A] h-7">
                      {countList[`${cartitem._id}`] >= 1 && (
                        <button
                          onClick={() => {
                            dispatch(removeProduct(cartitem));
                          }}
                          className="flex items-center justify-center bg-[#268462] rounded"
                        >
                          <img src="/assets/icons/minus-icon.svg" alt="add" />
                        </button>
                      )}
                      <p className="mx-auto -my-0.5 font-semibold text-white text-center ">
                        {countList[`${cartitem._id}`] !== undefined &&
                        countList[`${cartitem._id}`] !== 0
                          ? countList[`${cartitem._id}`]
                          : "Add"}
                      </p>
                      <button
                        onClick={() => {
                          dispatch(addProduct(cartitem));
                        }}
                        className="float-right w-5 h-5 flex items-center justify-center bg-[#268462] rounded"
                      >
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
              );
            })}
          </div>
        ) : (
          <div className=" py-8 font-semibold text-lg mx-6">
            No item added to cart. Add now
          </div>
        )}

        {/* Price Summary */}
        <div className="card mx-3 my-4 rounded px-4 py-2  bg-[#ffffff] text-[#1F2937] font-semibold shadow">
          <p className="text-xl font-semibold my-2 mx-6 ">Price Summary</p>
          <div className="flex w-full flex-row justify-between px-8 py-2 border-t border-slate-400 text-sm ">
            <p>Sub Total</p>
            <p>{totalAmount}</p>
          </div>
          <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
            <p>Delivery Charges</p>
            <p className="pr-2">+ 40</p>
          </div>
          <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
            <p> Grand Total</p>
            <p>{totalAmount + 40}</p>
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
        <button
          onClick={() => navigate("/checkout")}
          className="w-5/6 rounded-lg bg-[#4DBD7A] h-10 mx-8 font-semibold text-white text-lg mb-20"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;

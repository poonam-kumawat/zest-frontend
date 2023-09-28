const Cart = ({
  setShowCart,
  showCart,
}: {
  setShowCart: any;
  showCart: any;
}) => {
  return (
    <div className="bg-[#333333] bg-opacity-70  h-full fixed z-50 w-full grid place-content-end">
      <div className="bg-[#F6F6F6] text-[#000] w-full h-screen ">
        <div className="flex justify-between border-b border-slate-400">
          <div className="text-[#1F2937] text-2xl font-semibold my-2 mx-6">
            My Cart
          </div>
          <div className="text-[#656565] text-sm m-4 ">Item Count : 0</div>
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
        <div className=" pt-60 font-semibold text-lg mx-8">
          No item added to cart. Add now
        </div>
      </div>
    </div>
  );
};

export default Cart;

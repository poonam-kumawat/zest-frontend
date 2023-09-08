const ProductDetailsPage: React.FC = () => {
  return (
    <div className="">
      <div className="flex gap-2 mt-5">
        <div className="w-full h-screen grid-rows-2 border-e">
          <div className="w-2/3 p-10 m-auto border max-w-sm">
            <img className="w-full" src="/assets/images/pear.svg" alt="pear" />
          </div>
          <div className="p-10 ms-10 font-semibold">
            <div className="text-2xl text-[#5C625E] ">Details</div>
            <div className="text-[#747875] mt-5 text-lg">
              The pear tree and shrub are a species of genus Pyrus, in the
              family Rosaceae, bearing the pomaceous fruit of the same name.
              Several species of pear are valued for their edible fruit and
              juices while others are cultivated as trees.
            </div>
            <div className="text-[#747875] mt-5 ms-10">
              <ul className="list-disc">
                <li>Country of Origin : India</li>
                <li>Shelf Life : 5 days</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-full grid-rows-2">
          <div className="p-10">
            <div className="text-3xl font-semibold text-[#1F2937] ">
              Fresh Pear - Indian: 4 Pieces
            </div>
            <div className=" text-[#656565] mt-5 font-semibold border-b pb-5">
              <div className="pb-1">(4 pieces)</div>
              <div className="pb-1">MRP : ₹ 40</div>
              <div className="pb-1">In Stock</div>
              {/* Add button */}
              <div className="w-full flex flex-row p-1.5 rounded bg-[#4DBD7A] w-38 mt-5">
                <p className="middle m-auto font-semibold text-white text-center">
                  Add
                </p>
                <button className="end float-right w-6 h-6 flex items-center justify-center bg-[#268462] rounded">
                  <img
                    width={15}
                    height={15}
                    src="/assets/icons/plus-icon.svg"
                    alt="add"
                  />
                </button>
              </div>
            </div>
            <div className="py-5 text-2xl font-semibold text-[#1F2937]">
              How it works
            </div>
            <div className="flex pb-4">
              <div className="border p-5 h-18 me-5 my-auto">
                <img
                  width={45}
                  height={45}
                  src="/assets/icons/order-packed.svg"
                  alt="order_packed"
                />
              </div>
              <div className="text-lg font-semibold">
                <div className="text-[#1F2937]">Order Packed</div>
                <div className="text-[#747875]">
                  Your order will be packed safely and transferred to warehouse
                </div>
              </div>
            </div>
            <div className="flex pb-4">
              <div className="border p-5 h-18 me-5 my-auto">
                <img
                  width={45}
                  height={45}
                  src="/assets/icons/over-to-carrier.svg"
                  alt="order_packed"
                />
              </div>
              <div className="text-lg font-semibold">
                <div className="text-[#1F2937]"> Over to the Carrier</div>
                <div className="text-[#747875]">
                  The order will be picked from the warehouse and out for
                  delivery
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="border p-5 h-18 me-5 my-auto">
                <img
                  width={45}
                  height={45}
                  src="/assets/icons/out-for-delivery.svg"
                  alt="order_packed"
                />
              </div>
              <div className="text-lg font-semibold">
                <div className="text-[#1F2937]"> Out for delivery</div>
                <div className="text-[#747875]">
                  The order will be carefully delivered at your doorstep
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

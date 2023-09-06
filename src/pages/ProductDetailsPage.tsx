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
            <div className="text-[#747875] mt-5 text-md">
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
            <div className="text-2xl font-semibold text-[#1F2937] ">
              Fresh Pear - Indian: 4 Pieces
            </div>
            <div className=" text-[#656565] mt-5 font-semibold border-b pb-5">
              <div className="pb-1">(4 pieces)</div>
              <div className="pb-1">MRP : ₹ 40</div>
              <div className="pb-1">In Stock</div>
              {/* Add button */}
              <div className="w-full flex flex-row p-1.5 rounded bg-[#4DBD7A] w-48 mt-5">
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
            <div className="pt-5">How it works</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

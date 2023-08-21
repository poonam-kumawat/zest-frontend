import React from "react";

let quantity:number = 1;

const Card = () => {
  return (
    <div className="card w-1/6 gap-4 border-2 border-[#C8D2D0] rounded p-2 flex flex-col justify-center items-center">
      <img
        className="mt-10"
        src="/assets/images/pear.svg"
        alt="fruit"
        width={100}
        height={100}
      />
      <div className="name">
        <p className="text-base mt-4 font-semibold">
          Fresh Pear - Indian: 4 Pieces
        </p>
      </div>

      <div className="flex w-full flex-row justify-between">
        <p className="text-sm ml-3 text-[#656565]">MRP : ₹ 40</p>
        <p className="text-sm mr-3 text-[#656565]">(4 pieces)</p>
      </div>

      <div className="w-[90%] mb-2 jus flex flex-row justify-between p-1 rounded bg-[#4DBD7A]">
        {quantity <= 1 && (
          <button className="w-6 h-6 flex items-center justify-center bg-[#268462] rounded">
            <img
              width={15}
              height={15}
              src="/assets/icons/minus-icon.svg"
              alt="add"
            />
          </button>
        )}
        <p className="middle font-semibold text-white flex items-center justify-center">
          {quantity > 0 ? quantity : "Add"}
        </p>
        <button className="end w-6 h-6 flex items-center justify-center bg-[#268462] rounded">
          <img
            width={15}
            height={15}
            src="/assets/icons/plus-icon.svg"
            alt="add"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;

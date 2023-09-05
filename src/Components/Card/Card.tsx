import React, { FC } from "react";

let quantity:number = 0;
interface CardProps {
  cardData: any
}

interface CardDataProps {
  id: number;
  name: string;
  availability: number,
  price: 40
}

const Card: FC<CardProps> = ({cardData}) => {
  return (
    <div className="card gap-4 border-2 border-[#C8D2D0] rounded p-4 flex flex-col justify-center">
      <img
        className="mt-5 m-auto"
        src="/assets/images/pear.svg"
        alt="fruit"
        width={130}
        height={130}
      />
      <div className="name">
        <p className="text-base mt-4 font-semibold">
          {cardData.name}
        </p>
      </div>

      <div className="flex w-full flex-row justify-between">
        <p className="text-sm text-[#656565]">MRP : ₹ {cardData.price}</p>
        <p className="text-sm text-[#656565]">({cardData.availability} pieces)</p>
      </div>

      <div className="w-full flex flex-row p-1 rounded bg-[#4DBD7A]">
        {quantity >= 1 && (
          <button className="w-6 h-6 flex items-center justify-center bg-[#268462] rounded">
            <img
              width={15}
              height={15}
              src="/assets/icons/minus-icon.svg"
              alt="add"
            />
          </button>
        )}
        <p className="middle m-auto font-semibold text-white text-center">
          {quantity > 0 ? quantity : "Add"}
        </p>
        <button className="end float-right w-8 h-8 flex items-center justify-center bg-[#268462] rounded">
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

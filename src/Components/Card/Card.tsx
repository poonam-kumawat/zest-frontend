import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct, removeProduct } from "../../Redux/reducer/cartReducer";
import { rootType } from "../../Redux/rootReducer";

// let quantity: number = 0;
interface CardProps {
  cardData: any;
}

// interface CardDataProps {
//   id: number;
//   name: string;
//   availability: number;
//   price: 40;
// }

const Card: FC<CardProps> = ({ cardData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { countList } = useSelector((state: rootType) => state.cart);

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="card cursor-pointer border-2 border-[#C8D2D0] rounded p-4 flex flex-col justify-center">
      <img
        className="m-auto mix-blend-multiply scale-[1.2]"
        src={cardData.imgUrl}
        alt="fruit"
        width={180}
        height={180}
        onClick={() => {
          scrollToTop();
          navigate(`/product/${cardData._id}`);
        }}
      />
      <div className="gap-4 flex flex-col ">
        <div className="name">
          <p
            className="text-base font-semibold"
            onClick={() => {
              navigate(`/product/${cardData._id}`);
            }}
          >
            {cardData.productName}
          </p>
        </div>

        <div className="flex w-full flex-row justify-between">
          <p className="text-sm text-[#656565]">{cardData.price}</p>
          <p className="text-sm text-[#656565]">({cardData.availability})</p>
        </div>
        <div className="w-full flex flex-row p-1 rounded bg-[#4DBD7A]">
          {countList[`${cardData._id}`] >= 1 && (
            <button
              className="w-6 h-6 flex items-center justify-center bg-[#268462] rounded"
              onClick={() => {
                dispatch(removeProduct(cardData));
              }}
            >
              <img
                width={15}
                height={15}
                src="/assets/icons/minus-icon.svg"
                alt="plus"
              />
            </button>
          )}
          <p className="middle m-auto font-semibold text-white text-center">
            {countList[`${cardData._id}`] !== undefined &&
            countList[`${cardData._id}`] !== 0
              ? countList[`${cardData._id}`]
              : "Add"}
          </p>
          <button
            className="end float-right w-6 h-6 flex items-center justify-center bg-[#268462] rounded"
            onClick={() => {
              dispatch(addProduct(cardData));
            }}
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
};

export default Card;

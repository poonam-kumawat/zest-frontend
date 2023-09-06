import React from "react";
import Card from "../Card";
import "./category.css"

interface CardProps {
  id: number;
  name: string;
  availability: number;
  price: number;
}
const data: Array<CardProps> = [
  {
    id: 1,
    name: "Fresh Pear - Indian",
    availability: 4,
    price: 40,
  },
  {
    id: 2,
    name: "Fresh Apple - Indian",
    availability: 40,
    price: 140,
  },
  {
    id: 3,
    name: "Fresh Mango - Indian",
    availability: 10,
    price: 40,
  },
  {
    id: 4,
    name: "Fresh Orange - Indian",
    availability: 6,
    price: 90,
  },
];



const Category = () => {
  return (
    <div className="categortWrap">
      <div className="grid grid-cols-4 gap-1">
        <div className="col-start-1 col-end-2 p-6 pl-12">
          <div className="box border-2 border-b-0 border-[#ddd]">
            <div className="activeCategory border-[#ddd] border-b-2  p-5 flex align-middle hover:bg-[#F2FFF3] active  hover:border-r-0 hover:cursor-pointer ">
              <img
                src="/assets/images/karela.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Vegetables</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/pear.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Fruits</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/custudapple.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Salads</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/cherry.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Berries</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-t-0  p-5 flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/karela.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Vegetables</p>
            </div>
            <div className="border-[#ddd] border-b-2  p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/pear.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Fruits</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/custudapple.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Salads</p>
            </div>
            <div className="border-[#ddd] border-b-2 border-y-1 p-5  border-t-0  flex align-middle hover:bg-[#F2FFF3] hover:cursor-pointer ">
              <img
                src="/assets/images/custudapple.svg"
                className="w-12 pr-4"
                alt="img"
              />
              <p>Berries</p>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-end-5 p-6 pr-12">
          <p className="mb-5 font-semibold text-2xl">Fruits</p>
          <div className="grid grid-cols-4 grid-rows-auto gap-4">
            {data.map((cardData: CardProps) => {
              return <Card key={cardData.id} cardData={cardData} />;
            })}
          </div>
          <div className="grid grid-cols-4 grid-rows-auto gap-4 mt-10">
            {data.map((cardData: CardProps) => {
              return <Card key={cardData.id} cardData={cardData} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

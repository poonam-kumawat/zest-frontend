import React, { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import "./category.css";
import Loader from "../../Components/Common/Loader";
import { getProducts, getCategories } from "../../services/api.service";
import { useLocation } from "react-router-dom";

interface CardProps {
  _id: number;
  name: string;
  availability: number;
  price: number;
}

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    getCategoriesData();
    if (searchQuery) {
      getSearchResults();
    } else {
      getHomeProducts();
    }
  }, [searchQuery]);

  const getSearchResults = async () => {
    setLoading(true);
    const searchFilter = {
      productName: { $regex: searchQuery, $options: "i" },
    };
    const res = await getProducts(searchFilter);
    setProducts(res.data);
    setLoading(false);
  };

  const getHomeProducts = async () => {
    const fruitsFilter = {
      categories: { $regex: "Fruits", $options: "i" },
    };
    setLoading(true);
    const response = await Promise.all([getProducts(fruitsFilter)]);
    setLoading(false);

    setProducts(response[0].data.slice(0, 8));
  };
  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
    }
  };
  const scrollToTop = () => {
    window.scroll(0,0)
   }


  return (
    <div className="categortWrap min-h-screen w-full h-full">
      {!loading ? (
        <div className="grid grid-cols-4 gap-1">
          <div className="col-start-1 col-end-2 p-6 pl-12">
            <div className="box border-2 border-b-0 border-[#ddd]">
              {categories.map((category: any) => (
                <div
                  key={category._id}

                  className="activeCategory border-[#ddd] border-b-2  p-5 flex align-middle hover:bg-[#F2FFF3] active  hover:border-r-0 hover:cursor-pointer "
                  
                >
                  <img
                    // src="/assets/images/karela.svg"

                    src={category.imgUrl}
                    className="w-12 pr-4 mix-blend-multiply"
                    alt="img"
                  />
                  <p>{category.catergories}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-start-2 col-end-5 p-6 pr-12">
            <p className="mb-5 font-semibold text-2xl">Fruits</p>
            {products.length > 0 ? (
              <div onClick={()=>{scrollToTop()}}  className="grid grid-cols-4 grid-rows-auto gap-4">
                {products.map((cardData: CardProps) => {
                  return <Card key={cardData._id} cardData={cardData} />;
                })}
              </div>
            ) : (
              <p className="text-center text-xl">No Products Available</p>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Category;

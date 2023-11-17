import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import "./category.css";
import { getProducts, getCategories } from "../../services/api.service";
import { useLocation } from "react-router-dom";
import { LoaderHome } from "../../Components/Common/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CardProps {
  _id: number;
  name: string;
  availability: number;
  price: number;
}

const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState({ id: "", name: "" });
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const searchQueryCategories = searchParams.get("categories");

  const showToastMessage = () => {
    toast.error("Something Went Wrong !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    getCategoriesData();
    if (searchQuery || searchQueryCategories) {
      getSearchResults();
    } else {
      getHomeProducts();
    }
  }, [searchQuery, searchQueryCategories]);

  const getSearchResults = async () => {
    setLoading(true);
    let searchFilter;
    if (searchQueryCategories) {
      searchFilter = {
        categories: { $regex: searchQueryCategories, $options: "i" },
      };
    } else {
      searchFilter = {
        productName: { $regex: searchQuery, $options: "i" },
      };
    }
    const res = await getProducts(searchFilter);
    setProducts(res.data);
    setIsActive({
      id: res.data[0]?.categoryIds[0],
      name: res.data[0]?.categories,
    });
    setLoading(false);
  };

  const getHomeProducts = async () => {
    const fruitsFilter = {
      categories: { $regex: "Vegetables", $options: "i" },
    };
    setLoading(true);
    const response: any = await Promise.all([getProducts(fruitsFilter)]);
    setLoading(false);
    setProducts(response[0].data.slice(0, 8));
  };

  const getCategoriesData = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      if (!searchQuery && !searchQueryCategories) {
        setIsActive({
          id: response.data[0]._id,
          name: response.data[0].catergories,
        });
      }
    } catch (error) {
      showToastMessage();
    }
  };

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  const handleCategoryClick = async (id: any) => {
    try {
      const filterCategoryId = {
        categoryIds: id,
      };
      const res = await getProducts(filterCategoryId);
      setProducts(res.data);
    } catch (error) {
      showToastMessage();
    }
  };

  return (
    <div className="categortWrap min-h-screen w-full h-full">
      {!loading ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-1">
          <div className="col-span-1 md:col-start-1 md:col-end-2 md:p-6 md:pl-12">
            <div className="box border-2 border-b-0 border-[#ddd]">
              {categories.map((category: any) => (
                <div
                  key={category._id}
                  className={`${
                    isActive.id === category._id ? "activeCategory " : ""
                  }" border-[#ddd] border-b-2 p-5 md:flex align-middle hover:bg-[#F2FFF3] active hover:border-r-0 hover:cursor-pointer`}
                  onClick={() => {
                    handleCategoryClick(category._id);
                    setIsActive({
                      id: category._id,
                      name: category.catergories,
                    });
                  }}
                >
                  <img
                    // src="/assets/images/karela.svg"
                    src={category.imgUrl}
                    className="w-12 pr-4 mix-blend-multiply scale-[1.5]"
                    alt="img"
                  />
                  <p>{category.catergories}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 md:col-start-2 md:col-end-5 p-6 md:pr-12">
            <p className="mb-5 font-semibold text-2xl">{isActive.name}</p>
            {products.length > 0 ? (
              <div
                onClick={() => {
                  scrollToTop();
                }}
                className="grid md:grid-cols-4 md:grid-rows-auto gap-4"
              >
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
        <LoaderHome />
      )}
      <ToastContainer />
    </div>
  );
};

export default Category;

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

interface CategoryProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Category: React.FC<CategoryProps> = ({ loading, setLoading }) => {
  const [products, setProducts] = useState([]);
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
        <div className="max-w-screen-2xl mx-auto md:grid  md:grid-cols-4 gap-1">
          <div className="md:col-span-1 md:col-start-1 md:col-end-2 md:p-6 md:pl-12">
            <div className="fixed w-full bg-white z-50 md:z-0 md:static -mt-1 md:mt-0 flex  overflow-y-scroll md:grid  md:overflow-y-hidden md:box md:border-2 md:border-b-0 border-[#ddd]">
              {categories.map((category: any) => (
                <div
                  key={category._id}
                  className={`${
                    isActive.id === category._id ? "activeCategory " : ""
                  }" border-[#ddd] border-b-2 md:p-5 flex align-middle hover:bg-[#F2FFF3] active hover:border-r-0 hover:cursor-pointer px-5 pt-5 pb-1 md:flex-row flex-col items-center md:items-start`}
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
                    className="md:w-12 w-8 md:pr-4 pr-0 mb-5 md:mb-0 mix-blend-multiply scale-[1.5]"
                    alt="img"
                  />
                  <p className="whitespace-nowrap">{category.catergories}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 md:col-start-2 md:col-end-5 p-6 md:pr-12 pt-32 md:pt-6">
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

import { useEffect, useState } from "react";
import { getProducts } from "../services/api.service";
import { useParams } from "react-router-dom";
import Loader from "../Components/Common/Loader";

type ProductDetails = {
  availability: string;
  categories: string;
  categoryIds: ArrayBuffer;
  imgName: string;
  imgUrl: string;
  price: string;
  productName: string;
  product_description: string;
  quantity: string;
  seller: string;
  _id: string;
};

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const [details, setDetails] = useState<ProductDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) getHomeProducts(params.id);
  }, []);

  const getHomeProducts = async (id: string) => {
    const filter = {
      _id: id,
    };
    setLoading(true);
    const response = await getProducts(filter);
    setDetails(response.data[0]);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <div className="h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="md:flex md:gap-2 my-5 md:my-10 lg:w-4/5 mx-auto ">
            <div className="w-full h-full grid-rows-2 md:border-e">
              <div className="w-2/3 p-10 m-auto border max-w-sm">
                <img
                  className="w-full mix-blend-multiply scale-[1.5]"
                  src={details?.imgUrl}
                  alt={details?.productName}
                />
              </div>
              <div className="py-5 md:py-10 px-10">
                <div className="md:hidden pb-5">
                  <div className="text-3xl font-semibold text-[#1F2937]">
                    {details?.productName}
                  </div>
                  <div className=" text-[#656565] mt-5 border-b pb-8 text-lg ">
                    <div className="pb-1">Quantity: {details?.quantity}</div>
                    <div className="pb-1">MRP : {details?.price}</div>
                    <div className="pb-1">In Stock</div>
                    <div className="w-4/5 flex flex-row p-1.5 rounded bg-[#4DBD7A] mt-5 cursor-pointer">
                      <p className="middle m-auto  text-white text-center">
                        Add
                      </p>
                      <button className="w-6 h-6 flex items-center justify-center bg-[#268462] rounded my-auto ">
                        <img src="/assets/icons/plus-icon.svg" alt="add" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-2xl text-[#5C625E] ">Details</div>
                <div className="text-[#747875] mt-5 text-lg">
                  {details?.product_description}
                </div>
                <div className="text-[#747875] mt-5 ms-5 border-b md:border-none pb-10">
                  <ul className="list-disc">
                    <li>Country of Origin : India</li>
                    <li>Shelf Life : 5 days</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full h-full grid-rows-2">
              <div className="px-10">
                <div className="hidden md:block">
                  <div className="text-3xl font-semibold text-[#1F2937]">
                    {details?.productName}
                  </div>
                  <div className=" text-[#656565] mt-5  border-b pb-10 text-lg">
                    <div className="pb-1">Quantity: {details?.quantity}</div>
                    <div className="pb-1">MRP : {details?.price}</div>
                    <div className="pb-1">In Stock</div>
                    <div className="w-1/2 flex flex-row p-1.5 rounded bg-[#4DBD7A] w-38 mt-5 cursor-pointer">
                      <p className="middle m-auto font-semibold text-white text-center">
                        Add
                      </p>
                      <button className="end float-right w-6 h-6 flex items-center justify-center bg-[#268462] rounded my-auto">
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
                <div className="pt-0 pb-5  md:py-10 text-2xl font-semibold text-[#1F2937]">
                  How it works
                </div>
                <div className="flex pb-5">
                  <div className="border p-3 md:px-4 md:py-5 lg:p-5 h-16 w-24 md:h-18 md:w-18 lg:h-20 lg:w-18 me-5 my-auto">
                    <img
                      src="/assets/icons/order-packed.svg"
                      alt="order_packed"
                    />
                  </div>
                  <div className="text-lg">
                    <div className="text-[#1F2937] font-semibold">Order Packed</div>
                    <div className="text-[#747875]">
                      Your order will be packed safely and transferred to
                      warehouse
                    </div>
                  </div>
                </div>
                <div className="flex pb-4">
                  <div className="border p-3 md:px-4 md:py-5 lg:p-5 h-16 w-24 md:h-18 md:w-18 lg:h-20 lg:w-18 me-5 my-auto">
                    <img
                      src="/assets/icons/over-to-carrier.svg"
                      alt="over_to_carrier"
                    />
                  </div>
                  <div className="text-lg ">
                    <div className="text-[#1F2937] font-semibold"> Over to the Carrier</div>
                    <div className="text-[#747875]">
                      The order will be picked from the warehouse and out for
                      delivery
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="border p-3 md:px-4 md:py-5 lg:p-5 h-16 w-24 md:h-18 md:w-18 lg:h-20 lg:w-18 me-5 my-auto">
                    <img
                      src="/assets/icons/out-for-delivery.svg"
                      alt="out_for_delivery"
                    />
                  </div>
                  <div className="text-lg">
                    <div className="text-[#1F2937] font-semibold"> Out for delivery</div>
                    <div className="text-[#747875]">
                      The order will be carefully delivered at your doorstep
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F5F5] md:h-24 flex justify-between px-10  mb-5">
            <div className="md:flex m-auto">
              <div className="flex">
                <img
                  className="w-16  xl:mx-12"
                  src="/assets/icons/no-minimum-order.svg"
                  alt="no-minimum-order"
                />
                <div className=" m-8 text-[#1F2937] font-semibold">
                  NO MINIMUM ORDER
                </div>
              </div>
              <div className="flex">
                <img
                  className="w-16  lg:mx-12"
                  src="/assets/icons/45-min-delivery.svg"
                  alt="45-min-delivery"
                />
                <div className=" m-8 text-[#1F2937] font-semibold">
                  45 MINS DELIVERY
                </div>
              </div>
              <div className="flex">
                <img
                  className="w-16 xl:mx-12"
                  src="/assets/icons/contactless-safe.svg"
                  alt="contactless-safe"
                />
                <div className="m-8 text-[#1F2937] font-semibold">
                  CONTACTLESS & SAFE
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;

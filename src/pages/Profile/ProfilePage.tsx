import { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import {
  fetchUserDetails,
  getAddresses,
  orderDetails,
  updateUserDetails,
} from "../../services/api.service";
import AddressView from "../../Components/AddressView/AddressView";
import { LoaderHome } from "../../Components/Common/Loader";
import { toast } from "react-toastify";
import moment from "moment";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("details");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addresses, setAddreses] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [activeOrder, setActiveOrder] = useState("");
  const { email } = useSelector((state: rootType) => state.user);

  const getUserDetails = async () => {
    //add error handling later
    try {
      const { data } = await fetchUserDetails(email);
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setPhoneNumber(data?.phoneNumber);
      const resp: any = await getAddresses({ email });
      setAddreses(resp.data);
      const orders: any = await orderDetails({ email });
      setOrders(orders.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const updateDetails = async () => {
    try {
      const update = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      };
      await updateUserDetails(email, update);
    } catch (error) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return !loading ? (
    <div className=" w-full px-4">
      <div className=" mx-auto  max-w-screen-xl">
        <div className=" grid grid-cols-4 gap-0  border shadow mx-32 my-7 rounded-e-2xl bg-[#fff] mx-auto ">
          <div className="rounded-r-3xl bg-[#3BB77E] text-[#ffffff] ">
            <div className=" border-b-2 border-[#ffffff] m-5 text-3xl p-6 pb-8 font-semibold">
              My
              <br /> Account
            </div>
            <div className="">
              <div
                className={`mt-8 text-xl border-[#fff] border-s-4  mx-6 p-3 rounded-r-2xl font-bold my-5 profile-tab-hover ${
                  isActive === "details" ? "profile-tab-active" : ""
                }`}
                onClick={() => {
                  setIsActive("details");
                }}
              >
                Details
              </div>
              <div
                className={`mt-8 text-xl border-[#fff] border-s-4  mx-6 p-3 rounded-r-2xl font-bold my-5 profile-tab-hover ${
                  isActive === "address" ? "profile-tab-active" : ""
                }`}
                onClick={() => {
                  setIsActive("address");
                }}
              >
                Address
              </div>
              <div
                className={`mt-8 text-xl border-[#fff] border-s-4  mx-6 p-3 rounded-r-2xl font-bold my-5 profile-tab-hover ${
                  isActive === "orders" ? "profile-tab-active" : ""
                }`}
                onClick={() => {
                  setIsActive("orders");
                }}
              >
                Orders
              </div>
            </div>
          </div>
          <div className="w-full col-span-3 h-[550px]">
            {isActive === "details" ? (
              <div className="mx-8 my-16 grid gap-8 ">
                {/* Add Validation to form fields */}
                <div className="border-b-2 border-[#3BB77E] text-2xl font-semibold pb-4">
                  Profile
                </div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 outline-[#747875] text-[#656565] border rounded "
                ></input>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  className="p-2 outline-[#747875] text-[#656565] border rounded"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                <input
                  disabled
                  type="text"
                  placeholder="Email"
                  value={email}
                  className="p-2 outline-[#747875] text-[#656565] border rounded"
                ></input>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="p-2 outline-[#747875] text-[#656565] border rounded"
                  maxLength={10}
                ></input>
                <button
                  onClick={updateDetails}
                  className="w-1/5 h-8 bg-[#3BB77E] rounded text-[#fff] place-self-end me-2"
                >
                  Save
                </button>
              </div>
            ) : isActive === "address" ? (
              <div>
                <div className="border-b-2 border-[#3BB77E] text-2xl font-semibold pt-16 pb-4 mx-8">
                  Address
                </div>
                <div className="h-96 overflow-y-scroll">
                  <AddressView
                    payment={false}
                    setLoading={setLoading}
                    createOrder={""}
                    order={""}
                    addresses={addresses}
                    setAddreses={setAddreses}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="border-b-2 border-[#3BB77E] text-2xl font-semibold pt-16 pb-4 mx-8 ">
                  Orders
                </div>
                <div className="h-96 overflow-y-scroll text-[#828282]">
                  {orders.map((order: any) => {
                    return (
                      <div>
                        <div className="border rounded mx-8 mt-4 hover:shadow p-4">
                          <div className="flex ">
                            <div className="flex-1">
                              Order Id :{" "}
                              <span>
                                {new Date(order.timeStamp)
                                  .getTime()
                                  .toString()
                                  .slice(5)}
                              </span>
                            </div>
                            <div className="flex-1 grid place-content-end">
                              <img
                                src="/assets/icons/dropdown-arrow-icon.svg"
                                alt="dropdown-arrow"
                                onClick={() => {
                                  if (activeOrder !== order._id.toString())
                                    setActiveOrder(order._id);
                                  else setActiveOrder("");
                                }}
                              />
                            </div>
                          </div>
                          <div>Total Items : {order.totalItemCount}</div>
                          <div>
                            Orded Date :{" "}
                            {moment(order.timeStamp)
                              .format("DD-MM-YYYY")
                              .toString()}
                          </div>
                          <div>Delivery Charges : Rs.40</div>
                          <div>Total Amount : Rs.{order.totalAmount}</div>
                          <div>
                            Address :{" "}
                            {order?.address.length > 300
                              ? order?.address.slice(0, 200) + "..."
                              : order?.address}
                          </div>
                        </div>
                        {order._id.toString() === activeOrder ? (
                          <div className="bg-[#edf2f0] border rounded-b-lg  mx-8 ">
                            {order?.itemDetails?.map((item: any) => {
                              return (
                                <div
                                  key={item._id}
                                  className="flex card cursor-pointer m-4 gap-4 rounded  p-2 flex justify-center bg-[#ffffff] shadow"
                                >
                                  <img
                                    className="mx-4 my-auto"
                                    src={item.imgUrl}
                                    alt="fruit"
                                    width={80}
                                    height={80}
                                  />
                                  <div className="pr-14">
                                    <div className="name">
                                      <p className="text-base font-semibold my-2">
                                        {item.productName} ({item.quantity})
                                      </p>
                                      <p className="text-sm text-[#656565] pr-12">
                                        No. of Items : {""}
                                        {
                                          order?.items?.find(
                                            (ele: any) =>
                                              ele._id === order.items._id
                                          )?.itemCount
                                        }
                                      </p>
                                    </div>
                                    <div className="flex w-full flex-row justify-between py-2">
                                      <p className="text-sm text-[#656565] pr-12">
                                        Price: {item.price}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoaderHome />
  );
};

export default ProfilePage;

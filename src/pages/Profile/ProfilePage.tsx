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

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("details");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addresses, setAddreses] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
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
                {/* Add Validationto form fields */}
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
                <div className="border-b-2 border-[#3BB77E] text-2xl font-semibold pt-16 pb-4 mx-8">
                  Orders
                </div>
                {orders.map}

                <div className="border rounded mx-8 my-4 hover:shadow p-4">
                  order id : 6557a08642bb60404ede61b0
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-e">
                      <div>Total Items: 5</div>
                      <div>Delivery Charges: Rs.40</div>
                      <div>Total Amount: Rs.1000</div>
                    </div>
                    <div>
                      <div>created at : 19-11-23, 10:31</div>
                      <div>
                        address : Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Amet mattis vulputate
                        enim nulla aliquet porttitor lacus. Nisl pretium fusce
                        id velit ut tortor pretium viverra suspendisse.
                      </div>
                    </div>
                  </div>
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

import { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import {
  fetchUserDetails,
  getAddresses,
  orderDetails,
} from "../../services/api.service";
import AddressView from "../../Components/AddressView/AddressView";
import { LoaderHome } from "../../Components/Common/Loader";
import { toast } from "react-toastify";
import UserDetailForm from "../../Components/UserDetailForm/UserDetailForm";
import OrderList from "../../Components/OrderList/OrderList";
import ProfileTabsSidebar from "../../Components/ProfileTabsSidebar/ProfileTabsSidebar";

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

  useEffect(() => {
    getUserDetails();
  }, []);

  return !loading ? (
    <div className=" w-full px-4">
      <div className=" mx-auto  max-w-screen-xl">
        <div className=" grid grid-cols-4 gap-0  border shadow mx-32 my-7 rounded-e-2xl bg-[#fff] mx-auto ">
          <ProfileTabsSidebar isActive={isActive} setIsActive={setIsActive} />
          <div className="w-full col-span-3 h-[550px]">
            {isActive === "details" ? (
              <div className="mx-8 my-16 grid gap-8 ">
                {/* Add Validation to form fields */}
                <div className="border-b-2 border-[#3BB77E] text-2xl font-semibold pb-4">
                  Profile
                </div>
                <UserDetailForm
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
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
                <OrderList
                  orders={orders}
                  activeOrder={activeOrder}
                  setActiveOrder={setActiveOrder}
                />
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

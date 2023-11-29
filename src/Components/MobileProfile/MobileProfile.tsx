import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AddressView from "../AddressView/AddressView";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import {
  fetchUserDetails,
  getAddresses,
  orderDetails,
  updateUserDetails,
} from "../../services/api.service";
import { toast } from "react-toastify";
import OrderList from "../OrderList/OrderList";
import UserDetailForm from "../UserDetailForm/UserDetailForm";
import { useNavigate } from "react-router-dom";
const MobileProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addresses, setAddreses] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const { email } = useSelector((state: rootType) => state.user);
  const [activeOrder, setActiveOrder] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="MobileWrap">
      <div className="bg-white px-2 py-5 border-b-2 border-[#ebebeb] flex items-center gap-2">
        <FontAwesomeIcon
          onClick={() => {
            isActive !== "" ? setIsActive("") : navigate(`/`);
          }}
          icon={faArrowLeft}
          size="lg"
          color="#828282"
          className="cursor-pointer"
        />
        <p>My Account</p>
      </div>
      {!isActive && (
        <div className="grid">
          <div
            onClick={() => {
              setIsActive("details");
            }}
            className={`cursor-pointer bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between 
           ${isActive === "details" ? "profile-tab" : " "}`}
          >
            <p>Profile</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              color="#4DBD7A"
              className="cursor-pointer"
            />
          </div>
          <div
            onClick={() => {
              setIsActive("address");
            }}
            className={`cursor-pointer bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between 
           ${isActive === "address" ? "profile-tab" : " "}`}
          >
            <p>Address</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              color="#4DBD7A"
              className="cursor-pointer"
            />
          </div>
          <div
            onClick={() => {
              setIsActive("orders");
            }}
            className={`cursor-pointer bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between 
           ${isActive === "orders" ? "profile-tab" : " "}`}
          >
            <p>Orders</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              size="lg"
              color="#4DBD7A"
              className="cursor-pointer"
            />
          </div>
        </div>
      )}

      {isActive === "details" ? (
        <div className="address grid gap-5 p-5">
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
        <div className="address">
          <AddressView
            payment={false}
            setLoading={setLoading}
            createOrder={""}
            order={""}
            addresses={addresses}
            setAddreses={setAddreses}
          />
        </div>
      ) : isActive === "orders" ? (
        <OrderList
          orders={orders}
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default MobileProfile;

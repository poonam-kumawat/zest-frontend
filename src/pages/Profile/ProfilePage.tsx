import { useEffect, useState } from "react";
import "./ProfilePage.css";
import { useSelector } from "react-redux";
import { rootType } from "../../Redux/rootReducer";
import {
  fetchUserDetails,
  updateUserDetails,
} from "../../services/api.service";

const ProfilePage = () => {
  const [isActive, setIsActive] = useState("details");
  const [userDetails, setUserDetails] = useState<any>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { email } = useSelector((state: rootType) => state.user);

  const getUserDetails = async () => {
    try {
      const { data } = await fetchUserDetails(email);
      setUserDetails(data);
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setPhoneNumber(data?.phoneNumber);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const updateDetails = async () => {
    try {
      const update = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      };
      console.log("update : ", update);
      const { data } = await updateUserDetails(email, update);
      console.log("data", data);

      // setUserDetails(res.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    console.log("lastName", lastName);
  }, [lastName]);

  return (
    <div className=" h-full w-full ">
      <div className=" mx-auto  max-w-screen-xl">
        <div className=" grid grid-cols-4 gap-0  border mx-32 my-7 rounded-e-2xl bg-[#fff] mx-auto ">
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
          <div className="w-full col-span-3">
            {isActive === "details" ? (
              <div className="mx-16 my-20 grid gap-8 ">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 outline-[#747875] text-[#656565] 
               border rounded"
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
                <button onClick={updateDetails}>Save</button>
              </div>
            ) : isActive === "address" ? (
              <div className="mx-16 my-14 grid gap-8 ">
                <div className="border-2 rounded p-2 grid">
                  <input
                    type="text"
                    placeholder="Address 1"
                    className="border p-1 w-1/4 mb-2 outline-[#747875] "
                  ></input>
                  <textarea
                    rows={3}
                    className="border outline-[#747875] "
                  ></textarea>
                </div>
                <div>
                  <button className="border-2 w-2/6 p-2 flex text-[#656565]  rounded hover:border-[#747875] ">
                    <img
                      width={15}
                      height={15}
                      src="/assets/icons/gray-plus-icon.svg"
                      alt="plus"
                      className="my-auto ms-1 me-3"
                    />
                    Add Address
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

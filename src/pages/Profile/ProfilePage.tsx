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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState<any>({});
  const [address, setAddress] = useState({
    name: "",
    address: "",
  });
  const { email } = useSelector((state: rootType) => state.user);

  const getUserDetails = async () => {
    //add error handling later
    try {
      const { data } = await fetchUserDetails(email);
      setFirstName(data?.firstName);
      setLastName(data?.lastName);
      setPhoneNumber(data?.phoneNumber);
      setUserDetails(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const updateDetails = async () => {
    //add error handling later
    try {
      let update;
      if (address.address === "") {
        update = {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        };
      } else {
        update = {
          name: address.name,
          address: address.address,
        };
      }
      await updateUserDetails(email, update);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className=" w-full ">
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
          <div className="w-full col-span-3 h-[500px]">
            {isActive === "details" ? (
              <div className="ms-16 me-48 my-16 grid gap-8 ">
                {/* Add Validationto form fields */}
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 outline-[#747875] text-[#656565] 
               border rounded "
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
              <div className="m-16 grid gap-8 overflow-y-scroll max-h-96 ">
                {userDetails?.address?.map((item: any, index: number) => {
                  return (
                    <div className="border-2 rounded p-2 grid border-[#cdd4d1]">
                      <div className="grid grid-flow-row auto-rows-max">
                        <div className=" font-semibold">{item.name}</div>
                        <div>{item.address}</div>
                      </div>
                    </div>
                  );
                })}
                <div className="border-2 rounded p-2 grid border-[#cdd4d1]">
                  <form className="grid grid-flow-row auto-rows-max">
                    <input
                      required
                      type="text"
                      placeholder="Address Name"
                      className="border p-1 w-1/4 mb-2 outline-[#747875] "
                      value={address.name}
                      onChange={(e: any) => {
                        setAddress({
                          ...address,
                          name: e.target.value,
                        });
                      }}
                    ></input>
                    <textarea
                      required
                      rows={3}
                      className="border outline-[#747875] "
                      value={address.address}
                      onChange={(e: any) => {
                        setAddress({
                          ...address,
                          address: e.target.value,
                        });
                      }}
                    ></textarea>

                    <button
                      onClick={() => {
                        if (address.name !== "" && address.address !== "") {
                          updateDetails();
                        }
                      }}
                      className="w-[70px] h-6 bg-[#3BB77E] rounded text-[#fff] place-self-end mt-2"
                    >
                      Save
                    </button>
                  </form>
                </div>

                <div>
                  <button className="border-2 w-2/6 p-2 flex text-[#656565] rounded hover:border-[#747875] ">
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
              <div className=" p-6"> Order Page</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

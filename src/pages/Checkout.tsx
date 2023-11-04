import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { rootType } from "../Redux/rootReducer";
import { getUserDetails } from "../services/api.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCross,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import AddressModal from "../Components/AddressModal/AddressModal";

const Checkout = () => {
  const [dummyData, setDummyData]: any = useState([
    {
      address:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolorum fuga nemo assumenda molestiae a dicta eum cum ipsa quas quod, ab animi iure placeat unde obcaecati vitae nostrum fugit. Soluta sequi facere delectus et provident suscipit error, consequuntur, dolorem ipsa iusto temporibus? Necessitatibus architecto praesentium obcaecati nostrum fuga non. Recusandae quisquam velit architecto dolorum ut excepturi magni placeat totam eaque, facere delectus! Similique, maiores? Autem maxime explicabo, veniam ratione nisi odio inventore nemo facere ab culpa ipsam commodi cum iste quia dolor. Ipsa hic pariatur quod id placeat optio consequatur! Nam dolorum nemo labore placeat assumenda temporibus exercitationem sunt nulla non reprehenderit impedit numquam ex libero velit, excepturi maxime voluptas doloribus quaerat officia! Commodi minus excepturi labore molestiae quis blanditiis architecto dolor fugit voluptatum. Ex accusantium quaerat soluta, est odit nulla sed id quibusdam illum sequi a vel saepe dignissimos ipsam quis ratione quos voluptates labore fuga temporibus asperiores.",
      recieverName: "Yash Bhanushali",
      contactNumber: "8879848787",
    },
    {
      address:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolorum fuga nemo assumenda molestiae a dicta eum cum ipsa quas quod, ab animi iure placeat unde obcaecati vitae nostrum fugit. Soluta sequi facere delectus et provident suscipit error, consequuntur, dolorem ipsa iusto temporibus? Necessitatibus architecto praesentium obcaecati nostrum fuga non. Recusandae quisquam velit architecto dolorum ut excepturi magni placeat totam eaque, facere delectus! Similique, maiores? Autem maxime explicabo, veniam ratione nisi odio inventore nemo facere ab culpa ipsam commodi cum iste quia dolor. Ipsa hic pariatur quod id placeat optio consequatur! Nam dolorum nemo labore placeat assumenda temporibus exercitationem sunt nulla non reprehenderit impedit numquam ex libero velit, excepturi maxime voluptas doloribus quaerat officia! Commodi minus excepturi labore molestiae quis blanditiis architecto dolor fugit voluptatum. Ex accusantium quaerat soluta, est odit nulla sed id quibusdam illum sequi a vel saepe dignissimos ipsam quis ratione quos voluptates labore fuga temporibus asperiores.",
      recieverName: "Amitabh Bacchaan",
      contactNumber: "9717909167",
    },
  ]);
  const { email } = useSelector((state: rootType) => state.user);
  const [user, setUser] = useState<any>({});
  const getUser = async () => {
    const resp: any = await getUserDetails(email);
    setUser(resp.data);
    console.log("resp", resp);
  };
  const [addressModal, setaddressModal] = useState(false);
  const [order, setorder] = useState<any>({});

  useEffect(() => {
    getUser();
  }, []);

  const createOrder = (addressDetails: any) => {
    setorder({
      ...addressDetails,
      amount: 450,
    });
  };

  useEffect(() => {
    console.log({ order });
  }, [order]);

  return (
    <div>
      <div className="w-full h-full min-h-screen flex flex-col px-28 pt-16 gap-2">
        <div className="max-w-screen-2xl mx-auto">
          <p className="text-3xl font-medium text-[#656565] mb-2">
            Enter Address
          </p>
          <div className="flex gap-6">
            <div className="w-[60%] flex flex-col">
              <div className="border border-[#D9DDDC] rounded-lg">
                <div className="p-8 flex flex-col gap-3 w-full">
                  <div className="flex justify-between">
                    <p className="text-[#656565] text-lg font-normal">
                      Use a saved address or a new address
                    </p>
                    <button
                      type="submit"
                      disabled={dummyData.length >= 3}
                      className={`${
                        dummyData.length >= 3 ? "bg-[#96e4b5]" : "bg-[#4DBD7A]"
                      } px-2 py-2 font-medium text-white rounded-lg flex justify-center items-center gap-2`}
                      onClick={() => setaddressModal(!addressModal)}
                    >
                      Add Address
                      <img
                        width={15}
                        height={15}
                        src="/assets/icons/plus-icon.svg"
                        alt="add"
                      />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {dummyData.length > 0 &&
                      dummyData.map((addr: any) => (
                        <div
                          key={addr.recieverName}
                          onClick={() => createOrder(addr)}
                          className={`${
                            order?.recieverName === addr?.recieverName
                              ? "border-2 border-[#4DBD7A]"
                              : "border-dashed border-[#babdbc]"
                          } cursor-pointer relative w-full border p-5 gap-3 rounded-lg flex flex-col`}
                        >
                          <FontAwesomeIcon
                            className="absolute top-4 right-4"
                            icon={faEdit}
                            color="#4DBD7A"
                          />
                          <FontAwesomeIcon
                            className="absolute top-4 right-12"
                            icon={faTrash}
                            color="#4DBD7A"
                          />
                          <p className=" text-base font-medium">
                            {addr.recieverName}
                          </p>
                          <p className="text-sm text-[#656565]">
                            {addr?.address.length > 300
                              ? addr?.address.slice(0, 200) + "..."
                              : addr?.address}
                          </p>

                          <p className="text-sm text-[#656565]">
                            {" "}
                            Contact Number : {addr.contactNumber}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="bg-[#F4FBF7] p-3" />
              <div className="border border-[#D9DDDC] rounded-lg">
                <div className="p-8 flex flex-col gap-3 w-full">
                  <div className="flex gap-4">
                    <img src="/assets/icons/payment.svg" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[#656565] text-lg font-medium">
                        Select a Payment Method
                      </p>
                      <p className=" text-sm text-[#656565]">
                        Use a RazorPay as a payment Gateway to make faster and easy Payments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[40%]">
              <div className="card mx-3 rounded px-4 py-2 border border-[#D9DDDC] bg-[#ffffff] text-[#1F2937] font-medium shadow">
                <p className="text-xl font-normal my-2 mx-6 ">Price Summary</p>
                <div className="flex w-full flex-row justify-between px-8 py-2 border-t border-slate-400 text-sm ">
                  <p>Sub Total</p>
                  <p>{40}</p>
                </div>
                <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
                  <p>Delivery Charges</p>
                  <p className="pr-2">+ 40</p>
                </div>
                <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
                  <p> Grand Total</p>
                  <p>{40 + 40}</p>
                </div>
              </div>
              <div className="flex m-2 p-4 text-[#656565]">
                <img
                  className="mr-4"
                  width={25}
                  src="/assets/icons/info-icon.svg"
                  alt="info"
                />
                <div className="text-sm">
                  Orders cancelled within 24 hrs of delivery won’t be applicable
                  for refund.In case of unexpected delays, a refund will be
                  provided, if applicable.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addressModal && (
        <AddressModal
          setaddressModal={setaddressModal}
          dummyData={dummyData}
          setDummyData={setDummyData}
        />
      )}
    </div>
  );
};

export default Checkout;

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { rootType } from "../Redux/rootReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddressModal from "../Components/AddressModal/AddressModal";
import { deleteAddress, getAddresses } from "../services/api.service";
import { LoaderHome } from "../Components/Common/Loader";

const Checkout = () => {
  const { email } = useSelector((state: rootType) => state.user);
  const [addresses, setAddreses] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getUserAddress = async () => {
    const resp: any = await getAddresses({ email });
    setAddreses(resp.data);
    console.log("resp", resp);
  };
  const [addressModal, setaddressModal] = useState(false);
  const [order, setorder] = useState<any>({});
  const [editAddress, setEditAddress] = useState({});

  const { totalAmount } = useSelector((state: rootType) => state.cart);

  useEffect(() => {
    setLoading(true);
    getUserAddress();
    setLoading(false);
  }, []);

  const createOrder = (addressDetails: any) => {
    setorder({
      ...addressDetails,
      amount: totalAmount,
    });
  };

  const deleteUserAddress = async (id: string) => {
    setLoading(true);
    const resp: any = await deleteAddress({ id });
    if (resp.status === 200) {
      const data = addresses.filter((item: any) => item._id !== id);
      setAddreses(data);
    }
    setLoading(false);
  };

  return !loading ? (
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
                      disabled={addresses.length >= 3}
                      className={`${
                        addresses.length >= 3 ? "bg-[#96e4b5]" : "bg-[#4DBD7A]"
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
                    {addresses.length > 0 &&
                      addresses.map((addr: any) => (
                        <div
                          key={addr._id}
                          onClick={() => createOrder(addr)}
                          className={`${
                            order._id === addr._id
                              ? "border-2 border-[#4DBD7A]"
                              : "border-dashed border-[#babdbc]"
                          } cursor-pointer relative w-full border p-5 gap-3 rounded-lg flex flex-col`}
                        >
                          <FontAwesomeIcon
                            className="absolute top-4 right-4"
                            icon={faEdit}
                            color="#4DBD7A"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditAddress(addr);
                              setaddressModal(true);
                            }}
                          />
                          <FontAwesomeIcon
                            className="absolute top-4 right-12"
                            icon={faTrash}
                            color="#4DBD7A"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUserAddress(addr._id);
                            }}
                          />
                          <p className=" text-base font-medium">{addr.name}</p>
                          <p className="text-sm text-[#656565]">
                            {addr?.address.length > 300
                              ? addr?.address.slice(0, 200) + "..."
                              : addr?.address}
                          </p>

                          <p className="text-sm text-[#656565]">
                            {" "}
                            Contact Number : {addr.phoneNumber}
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
                        Use a RazorPay as a payment Gateway to make faster and
                        easy Payments
                      </p>
                      {Object.keys(order).length > 0 && (
                        <div className="flex flex-col gap-5 mt-3">
                          <img
                            src="/assets/images/razorpay-icon.svg"
                            alt="razorpay"
                            width={300}
                          />
                          <button
                            type="submit"
                            className="w-1/2 text-lg py-1 font-medium bg-[#4DBD7A] text-white rounded-lg gap-2"
                          >
                            Proceed to Pay
                          </button>
                        </div>
                      )}
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
                  <p>{totalAmount}</p>
                </div>
                <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
                  <p>Delivery Charges</p>
                  <p>+ 40</p>
                </div>
                <div className="flex w-full flex-row justify-between px-8 py-2 text-sm ">
                  <p> Grand Total</p>
                  <p>{totalAmount + 40}</p>
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
          addressData={addresses}
          setAddreses={setAddreses}
          editAddress={editAddress}
        />
      )}
    </div>
  ) : (
    <LoaderHome />
  );
};

export default Checkout;
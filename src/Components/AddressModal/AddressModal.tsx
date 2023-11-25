import React, { useEffect, useState } from "react";
import { LoaderRing } from "../Common/Loader";
import { createAddress, updateAddress } from "../../services/api.service";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { rootType } from "../../Redux/rootReducer";
import { showErrorToast } from "../../utils/helper";

const AddressModal = ({
  setaddressModal,
  addressData = [],
  setAddreses,
  editAddress = {},
}: {
  setaddressModal: any;
  addressData?: any;
  setAddreses: any;
  editAddress?: any;
}) => {
  const [address, setaddress] = useState({
    address: editAddress?.address || "",
    name: editAddress?.name || "",
    phoneNumber: editAddress?.phoneNumber || "",
  });
  const [searching, setsearching] = useState(false);

  const { email } = useSelector((state: rootType) => state.user);

  const handleChange = (event: any) => {
    setaddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const addAddress = async () => {
    try {
      setsearching(true);
      const resp: any = await createAddress({ ...address, email });
      if (resp.status === 201) {
        setAddreses([...addressData, resp.data]);
        setsearching(false);
        setaddress({
          address: "",
          name: "",
          phoneNumber: "",
        });
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const updateUserAddress = async () => {
    try {
      setsearching(true);
      const resp: any = await updateAddress({
        ...address,
        id: editAddress._id,
        email : email
      });
      if (resp.status === 200) {
        const index: number = addressData.findIndex(
          (item: any) => item._id === editAddress._id
        );
        if (index !== -1) {
          const data: any = [...addressData];
          data[index] = { _id: editAddress._id, ...address };
          setAddreses(data);
        }
        setsearching(false);
      }
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  return (
    <>
      <div
        id="defaultModal"
        className="overflow-hidden fixed top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center flex bg-gray-900/40"
      >
        <div className="relative w-full max-w-2xl h-auto px-3">
          <div className="relative bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 rounded-t border-b">
              <h4 className="text-xl font-medium text-[#4DBD7A]">
                Add Delivery Details
              </h4>
              <FontAwesomeIcon
                icon={faClose}
                size="lg"
                color="#656565"
                className="cursor-pointer"
                onClick={() => setaddressModal(false)}
              />
            </div>
            <hr />
            <form
              className="flex flex-col py-6 px-4 md:px-8 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (Object.keys(editAddress).length > 0) {
                  updateUserAddress();
                } else {
                  addAddress();
                }
                setaddressModal(false);
              }}
            >
              <div>
                <label className=" text-[#656565] text-base" htmlFor="address">
                  {" "}
                  Enter Address
                </label>
                <textarea
                  className="border border-[#d2d4d3] w-full shadow-sm p-2 text-[#656565] outline-[#4DBD7A] rounded"
                  id="address"
                  name="address"
                  rows={3}
                  required
                  maxLength={200}
                  value={address.address}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label
                  className=" text-[#656565] text-base"
                  htmlFor="recieverName"
                >
                  {" "}
                  Receiver's Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={50}
                  className="border border-[#d2d4d3] w-full shadow-sm p-[0.4rem] text-[#656565] outline-[#4DBD7A] rounded"
                  value={address.name}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label
                  className="text-[#656565] text-base"
                  htmlFor="contactNumber"
                >
                  {" "}
                  Contact Number{" "}
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  title="Enter Valid Input"
                  required
                  value={address.phoneNumber}
                  className="border border-[#d2d4d3] w-full shadow-sm p-[0.4rem] text-[#656565] outline-[#4DBD7A] rounded"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 md:w-1/4 py-1 font-medium bg-[#4DBD7A] text-white rounded-lg gap-2"
                >
                  {searching ? <LoaderRing /> : <p>Save Address</p>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressModal;

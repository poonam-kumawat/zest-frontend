import React, { useEffect, useState } from "react";
import { LoaderRing } from "../Common/Loader";
import { getLocation } from "../../services/api.service";
import { useDispatch } from "react-redux";
import { saveLocation } from "../../Redux/reducer/locationReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const AddressModal = ({
  setaddressModal,
  dummyData = {},
  setDummyData,
}: {
  setaddressModal: any;
  dummyData?: any;
  setDummyData: any;
}) => {
  const [address, setaddress] = useState({
    address: "",
    recieverName: "",
    contactNumber: "",
  });

  const handleChange = (event: any) => {
    setaddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };

  const addAddress = () => {
    debugger;
    setDummyData([...dummyData, address]);
    setaddress({
      address: "",
      recieverName: "",
      contactNumber: "",
    });
  };

  useEffect(() => {
    console.log(dummyData);
  }, [dummyData]);

  return (
    <>
      <div
        id="defaultModal"
        className="overflow-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-gray-900/40"
      >
        <div className="relative w-full max-w-2xl h-full md:h-auto">
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
              className="flex flex-col py-6 px-8 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                addAddress();
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
                  id="recieverName"
                  name="recieverName"
                  type="text"
                  className="border border-[#d2d4d3] w-full shadow-sm p-[0.4rem] text-[#656565] outline-[#4DBD7A] rounded"
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
                  id="contactNumber"
                  name="contactNumber"
                  type="text"
                  className="border border-[#d2d4d3] w-full shadow-sm p-[0.4rem] text-[#656565] outline-[#4DBD7A] rounded"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/4 py-1 font-medium bg-[#4DBD7A] text-white rounded-lg gap-2"
                >
                  Save Address
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

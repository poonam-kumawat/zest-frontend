import React, { useState } from "react";
import { LoaderRing } from "../Common/Loader";
import { getLocation } from "../../services/api.service";

const Location = ({
  locationRef,
  setShowLocation,
  setdeliveryLocation,
}: {
  locationRef: any;
  setShowLocation: any;
  setdeliveryLocation: any;
}) => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [searching, setsearching] = useState(false);

  const checkLocation = async () => {
    const regex = /^\d{6}$/;
    if (regex.test(pincode)) {
      setError("");
      setsearching(true);
      const res: any = await getLocation({ pincode });
      if (res.data) {
        setdeliveryLocation(res.data.name)
        setShowLocation(false)
      } else {
        setsearching(false)
        setError("Products are not deliverable for the given Location")
      }
    } else {
      setError("Please Enter Valid Pincode");
    }
  };

  return (
    <>
      <div className="bg-[#333333] bg-opacity-70 p-4 md:p-8 md:justify-center h-full fixed z-50 w-full">
        <div
          className="bg-[#FFFFFF] text-[#000] flex flex-col gap-4 items-center rounded-lg p-8 md:w-4/5 h-fit max-w-3xl lg:max-h-52"
          ref={locationRef}
        >
          <div className="flex font-md text-lg">
            <img
              className="mx-6"
              src="/assets/icons/location-icon.svg"
              alt="location"
              width={30}
              height={30}
            />
            Please provide delivery location to check if product is deliverable
            or not
          </div>
          <form
            className="block justify-center lg:flex"
            onSubmit={(e) => {
              e.preventDefault();
              checkLocation();
            }}
          >
            <div className="relative me-4 ">
              <input
                type="text"
                className="border border-[#B8C6C3] py-2 w-full lg:w-96 shadow-sm  px-5 outline-[#B8C6C3] rounded"
                placeholder="Enter Pincode"
                maxLength={6}
                onChange={(e) => setPincode(e.target.value)}
                required
              ></input>
              <img
                className="mx-4 my-1 absolute right-0 top-0 mt-3 cursor-pointer"
                src="/assets/icons/search-icon.svg"
                alt="search"
                width={20}
                height={20}
              />
            </div>
            <div className="ps-4 relative">
              <button
                type="submit"
                className={`bg-[#4DBD7A] text-[#ffffff text-sm rounded-lg ${
                  searching ? "py-1" : "py-2"
                }  ps-5 pe-5 w-full`}
              >
                {searching ? (
                  <LoaderRing />
                ) : (
                  <p className="text-lg text-white">Apply</p>
                )}
              </button>
            </div>
          </form>
          {error !== "" && <p className="text-lg text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Location;

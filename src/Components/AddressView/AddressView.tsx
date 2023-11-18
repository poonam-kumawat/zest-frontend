import { useState } from "react";
import { deleteAddress } from "../../services/api.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddressModal from "../AddressModal/AddressModal";

const AddressView = ({
  payment,
  setLoading,
  createOrder,
  order,
  addresses,
  setAddreses,
}: {
  payment: boolean;
  setLoading: Function;
  createOrder: any;
  order: any;
  addresses: any;
  setAddreses: Function;
}) => {
  const [editAddress, setEditAddress] = useState("");
  const [addressModal, setaddressModal] = useState(false);

  const deleteUserAddress = async (id: string) => {
    setLoading(true);
    const resp: any = await deleteAddress({ id });
    if (resp.status === 200) {
      const data = addresses.filter((item: any) => item._id !== id);
      setAddreses(data);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 flex flex-col gap-3 w-full">
      <div className="flex justify-between">
        <p className="text-[#656565] text-lg font-normal">
          {payment ? "Use a saved address or a new address" : ""}
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
              onClick={() => {
                if (payment) {
                  createOrder(addr);
                }
              }}
              className={`${
                order.addressId === addr._id
                  ? "border-2 border-[#4DBD7A] "
                  : "border-dashed border-[#babdbc] hover:border-[#4DBD7A] hover:border-2 hover:border-solid"
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
      {addressModal && (
        <AddressModal
          setaddressModal={setaddressModal}
          addressData={addresses}
          setAddreses={setAddreses}
          editAddress={editAddress}
        />
      )}
    </div>
  );
};

export default AddressView;

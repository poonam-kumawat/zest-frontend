import { toast } from "react-toastify";
import { updateUserDetails } from "../../services/api.service";

const UserDetailForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  phoneNumber,
  setPhoneNumber,
}: {
  firstName: string;
  setFirstName: Function;
  lastName: string;
  setLastName: Function;
  email: string;
  phoneNumber: string;
  setPhoneNumber: Function;
}) => {
  const updateDetails = async () => {
    try {
      const update = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      };
      await updateUserDetails(email, update);
    } catch (error) {
      toast.error("Something Went Wrong !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-2 outline-[#747875] text-[#656565] border rounded "
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
    </>
  );
};

export default UserDetailForm;

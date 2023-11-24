import {
  faArrowLeft,
  faChevronRight,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MobileProfile = () => {
  return (
    <div className="MobileWrap">
      <div className="grid">
        <div className="bg-white px-2 py-5 border-b-2 border-[#ebebeb] flex items-center gap-2">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="lg"
            color="#828282"
            className="cursor-pointer"
          />
          <p>My Account</p>
        </div>
        <div className="bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between">
          <p>Profile</p>
          <FontAwesomeIcon
            icon={faChevronRight}
            size="lg"
            color="#4DBD7A"
            className="cursor-pointer"
          />
        </div>
        <div className="cursor-pointer bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between">
          <p>Address</p>
          <FontAwesomeIcon
            icon={faChevronRight}
            size="lg"
            color="#4DBD7A"
            className="cursor-pointer"
          />
        </div>
        <div className="cursor-pointer bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between">
          <p>Orders</p>
          <FontAwesomeIcon
            icon={faChevronRight}
            size="lg"
            color="#4DBD7A"
            className="cursor-pointer"
          />
        </div>
        <div className="cursor-pointer bg-white px-8 py-5 border-b-2 border-[#ebebeb] flex items-center justify-between">
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
};
export default MobileProfile;

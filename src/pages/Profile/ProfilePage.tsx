import AccountProfile from "../../Components/AccountProfile/AccountProfile";
import MobileProfile from "../../Components/MobileProfile/MobileProfile";

const ProfilePage = () => {
  return (
    <>
      <div className="md:block hidden ">
        <AccountProfile />
      </div>
      <div className="md:hidden block">
        <MobileProfile />
      </div>
    </>
  );
};
export default ProfilePage;

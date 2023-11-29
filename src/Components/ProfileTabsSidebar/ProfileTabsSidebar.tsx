const ProfileTabsSidebar = ({
  isActive,
  setIsActive,
}: {
  isActive: string;
  setIsActive: Function;
}) => {
  return (
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
  );
};

export default ProfileTabsSidebar;

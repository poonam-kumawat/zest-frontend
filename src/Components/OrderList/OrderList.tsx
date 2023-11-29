import moment from "moment";

const OrderList = ({
  orders,
  activeOrder,
  setActiveOrder,
}: {
  orders: any;
  activeOrder: string;
  setActiveOrder: Function;
}) => {
  return (
    <div className="h-full md:h-96 overflow-y-scroll text-[#828282]">
      {orders.map((order: any) => {
        return (
          <div
            className={`${
              activeOrder === order._id
                ? "border-2 border-[#4DBD7A] "
                : "border-dashed border-[#babdbc] hover:border-[#4DBD7A] hover:border-2 hover:border-solid"
            } cursor-pointer border p-4  rounded-lg mx-8 mt-6 mb-6 shadow`}
          >
            <div>
              <div
                onClick={() => {
                  if (activeOrder !== order._id.toString())
                    setActiveOrder(order._id);
                  else setActiveOrder("");
                }}
                className="flex pb-4 border-b md:px-6 items-baseline"
              >
                <div className="flex-1">
                  <span className="text-base font-medium text-[#1F2937]">
                    Order Id :{" "}
                  </span>
                  {new Date(order.timeStamp).getTime().toString().slice(5)}
                </div>

                <div className="flex-1 grid place-content-end flex">
                  <div className="flex">
                    <div className="pe-4">
                      <span className="text-base font-medium text-[#1F2937]">
                        Total Items :{" "}
                      </span>
                      {order.totalItemCount}
                    </div>
                    <img
                      src="/assets/icons/dropdown-arrow-icon.svg"
                      alt="dropdown-arrow"
                      className={
                        activeOrder === order._id.toString() ? "rotate-180" : ""
                      }
                      onClick={() => {
                        if (activeOrder !== order._id.toString())
                          setActiveOrder(order._id);
                        else setActiveOrder("");
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="md:px-6 pt-4 leading-7">
                <span className="text-base font-medium text-[#1F2937]">
                  Delivery Charges :{" "}
                </span>
                Rs.40
              </div>
              <div className="md:px-6 leading-7">
                <span className="text-base font-medium text-[#1F2937]">
                  Total Amount :{" "}
                </span>
                Rs.{order.totalAmount}
              </div>
              <div className="md:px-6 leading-7">
                <span className="text-base font-medium text-[#1F2937]">
                  Ordered Date :{" "}
                </span>
                {moment(order.timeStamp).format("DD-MM-YYYY").toString()}
              </div>

              <div className="md:px-6 leading-7">
                <span className="text-base font-medium text-[#1F2937]">
                  Address :{" "}
                </span>
                {order?.address.length > 300
                  ? order?.address.slice(0, 200) + "..."
                  : order?.address}
              </div>
            </div>
            {order._id.toString() === activeOrder ? (
              <div className=" mt-8">
                {order?.itemDetails?.map((item: any) => {
                  return (
                    <div
                      key={item._id}
                      className="border rounded-b-lg mb-4 grid card cursor-pointer  gap-4 grid-cols-4  rounded p-2 flex justify-center"
                    >
                      <img
                        className="m-auto col-start-1 col-end-2 md:col-start-1 md:col-end-1"
                        src={item.imgUrl}
                        alt="fruit"
                        width={80}
                        height={80}
                      />
                      <div className="md:grid md:grid-cols-3 flex flex-col col-start-2 col-end-6">
                        <p className="text-base font-semibold my-auto">
                          {item.productName} ({item.quantity})
                        </p>
                        <p className="text-sm text-[#656565] pr-12 my-auto">
                          No. of Items :{" "}
                          {
                            order?.items?.find(
                              (ele: any) => ele._id === order.items._id
                            )?.itemCount
                          }
                        </p>
                        <p className="text-sm text-[#656565] pr-12 my-auto">
                          Price: {item.price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;

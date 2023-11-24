import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootType } from "../Redux/rootReducer";
import {
  deleteAddress,
  generateOrder,
  getAddresses,
  verifyPayment,
} from "../services/api.service";
import { LoaderHome } from "../Components/Common/Loader";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../Redux/reducer/cartReducer";
import { showErrorToast } from "../utils/helper";
import { ToastContainer } from "react-toastify";
import AddressView from "../Components/AddressView/AddressView";

const Checkout = () => {
  const dispatch = useDispatch();

  const [addresses, setAddreses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [order, setorder] = useState<any>({});

  const { email } = useSelector((state: rootType) => state.user);
  const { totalAmount } = useSelector((state: rootType) => state.cart);
  const { productList } = useSelector((state: rootType) => state.cart);
  const { countList } = useSelector((state: rootType) => state.cart);
  const { cartTotalCount } = useSelector((state: rootType) => state.cart);

  const navigate = useNavigate();

  const getUserAddress = async () => {
    try {
      const resp: any = await getAddresses({ email });
      setAddreses(resp.data);
    } catch (error: any) {
      showErrorToast(error.message);
    }
  };

  const createOrder = (addressDetails: any) => {
    const userAddress = {
      ...addressDetails,
    };
    delete userAddress._id;
    setorder({
      ...userAddress,
      addressId: addressDetails._id,
      totalItemCount: cartTotalCount,
      items: productList.map((item: any) => {
        return {
          itemId: item._id,
          productName: item.productName,
          price: item.price,
          seller: item.seller,
          quantity: item.quantity,
          itemCount: countList[item._id],
        };
      }),
      totalAmount: totalAmount + 40,
    });
  };

  function loadScript(src: string) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await generateOrder({ totalAmount: order.totalAmount });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;
    const options = {
      key: "rzp_test_INymvkMXgx0K7V", // Enter the Key ID generated from the Dashboard
      amount: amount,
      name: order.name,
      description: "Zest Order Payment",
      currency: currency,
      order_id: order_id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderDetails: order,
        };
        const resp = await verifyPayment(data);

        if (resp.status === 200) {
          navigate("/");
          dispatch(emptyCart());
        }
      },
      prefill: {
        name: order.name,
        email: order.email,
        contact: order.phoneNumber,
      },
      notes: {
        address: order.address,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    setLoading(true);
    getUserAddress();
    setLoading(false);
  }, []);

  return !loading ? (
    <div>
      <div className="w-full h-full min-h-screen flex flex-col lg:px-28 pt-16 md:px-14 px-8 gap-2">
        <div className="max-w-screen-2xl mx-auto">
          <p className="text-3xl font-medium text-[#656565] mb-2">
            Enter Address
          </p>
          <div className="flex gap-6 md:flex-row flex-col">
            <div className="md:w-[60%] w-full flex flex-col">
              <div className="border border-[#D9DDDC] rounded-lg">
                <AddressView
                  payment={true}
                  setLoading={setLoading}
                  createOrder={createOrder}
                  order={order}
                  addresses={addresses}
                  setAddreses={setAddreses}
                />
              </div>
              <div className="bg-[#F4FBF7] p-3" />
              <div className="border border-[#D9DDDC] rounded-lg">
                <div className="p-4 md:p-8 flex flex-col gap-3 w-full">
                  <div className="flex gap-4">
                    <div>
                      <img src="/assets/icons/payment.svg" />
                    </div>
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
                            className="sm:w-1/2 w-3/4 text-lg py-1 font-medium bg-[#4DBD7A] text-white rounded-lg gap-2"
                            onClick={() => {
                              displayRazorpay();
                            }}
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

            <div className="md:w-[40%] w-full">
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
      <ToastContainer />
    </div>
  ) : (
    <LoaderHome />
  );
};

export default Checkout;

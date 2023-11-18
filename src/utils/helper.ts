import { toast } from "react-toastify";

export const showErrorToast = (erroMsg: string = "Something Went Wrong !") => {
  toast.error(erroMsg || "Something Went Wrong !", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

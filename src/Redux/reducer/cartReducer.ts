import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productList: [] as any,
    countList: {} as any,
    totalAmount: 0,
    itemCount: 0,
  },
  reducers: {
    setProductList: (state, action) => {
      const productDetails = action.payload;

      const check = state.productList.map((element: any) => {
        if (productDetails._id === element._id) return true;
        else return false;
      });

      if (check.includes(true)) {
        state.countList[productDetails._id] += 1;
        state.itemCount += 1;
        state.totalAmount += parseFloat(
          productDetails.price.replace("Rs ", "")
        );
      } else {
        state.productList = [...state.productList, productDetails];
        state.countList[productDetails._id] = 1;
        state.itemCount += 1;
        state.totalAmount += parseFloat(
          productDetails.price.replace("Rs ", "")
        );
      }
    },
  },
});

export const { setProductList } = cartSlice.actions;

export default cartSlice.reducer;

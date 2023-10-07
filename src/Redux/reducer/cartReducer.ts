import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productList: [] as any,
    countList: {} as any,
    itemCount: 0,
    totalAmount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const productDetails = action.payload;
      const existingItem = state.productList.find(
        (item: any) => item._id === productDetails._id
      );
      if (existingItem) {
        let price: number = parseFloat(existingItem.price.replace("Rs ", ""));
        price += parseFloat(productDetails.price.replace("Rs ", ""));
        existingItem.price = `Rs ${price}`;
        state.countList[productDetails._id] += 1;
      } else {
        state.productList = [...state.productList, productDetails];
        state.countList[productDetails._id] = 1;
      }
      state.itemCount += 1;
      state.totalAmount += parseFloat(productDetails.price.replace("Rs ", ""));
    },
    removeProduct: (state, action) => {
      //   const productDetails = action.payload;
      //   const existingItem = state.productList.find(
      //     (item: any) => item._id === productDetails._id
      //   );
      //   if (existingItem) {
      //     let price: number = parseFloat(existingItem.price.replace("Rs ", ""));
      //     price += parseFloat(productDetails.price.replace("Rs ", ""));
      //     existingItem.price = `Rs ${price}`;
      //     state.countList[productDetails._id] = 1;
      //   } else {
      //     state.productList = [...state.productList, productDetails];
      //     state.countList[productDetails._id] = 1;
      //   }
      //   state.itemCount -= 1;
      //   state.totalAmount -= parseFloat(productDetails.price.replace("Rs ", ""));
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;

import { configureStore, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const productsSlice = createSlice({
  name: "products",
  initialState: { productsList: [] },
  reducers: {
    setProducts: (state, action) => {
      state.productsList = action.payload;
    },
    clearProducts: (state) => {
      state.productsList = [];
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartList: [] },
  reducers: {
    addToCart: (state, action) => {
      const { productId, productQuantity } = action.payload;
      if (productQuantity <= 1) {
        alert("Out of Stock!");
        return;
      }
      const existingProduct = state.cartList.find(
        (item) => item.productId === productId
      );

      if (existingProduct && existingProduct.qty < productQuantity) {
        existingProduct.qty += 1;
        toast.success(`Quantity Incremented! ${existingProduct.productName}`);
      } else if (existingProduct) {
        toast.error(`Only ${productQuantity} available in stock!`);
      } else {
        state.cartList.push({ ...action.payload, qty: 1 });
        toast.success("Item added to cart successfully!");
      }
    },
    updateQty: (state, action) => {
      const { index, qty, item } = action.payload;
      if (qty > item.productQuantity) {
        state.cartList[index].qty = item.productQuantity;
        alert(`Only ${item.productQuantity} items are available in stock.`);
      } else {
        state.cartList[index].qty = qty > 0 ? qty : 1;
      }
    },
    removeFromCart: (state, action) => {
      const { index } = action.payload;
      state.cartList = state.cartList.filter((_, idx) => idx !== index);
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

const ReduxStore = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export const cartAction = cartSlice.actions;
export const productsAction = productsSlice.actions;
export default ReduxStore;

import { configureStore } from "@reduxjs/toolkit";
import { kuarmoniaApi } from "@/services/kuarmonia";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "@/features/auth/authSlice";
import productFilterSlice from "@/features/productFilter/productFilterSlice";
import brandSlice from "@/features/brand/brandSlice";
import productSlice from "@/features/product/productSlice";
import categorySlice from "@/features/category/categorySlice";
import storeSlice from "@/features/store/storeSlice";
import favoriteSlice from "@/features/favorite/favoriteSlice";
import cartSlice from "@/features/cart/cartSlice";
import purchaseSlice from "@/features/purchase/purchaseSlice";
import filterSlice from "@/features/filter/filterSlice";
import postReducer  from "@/features/post/postSlice";

export const store = configureStore({
  reducer: {
    [kuarmoniaApi.reducerPath]: kuarmoniaApi.reducer,
    auth: authSlice,
    brand: brandSlice,
    category: categorySlice,
    product: productSlice,
    store: storeSlice,
    favorite: favoriteSlice,
    cart: cartSlice,
    purchase: purchaseSlice,
    filter: filterSlice,
    post: postReducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(kuarmoniaApi.middleware),
  devTools: process.env.NODE_ENV !== "production"
});

setupListeners(store.dispatch);

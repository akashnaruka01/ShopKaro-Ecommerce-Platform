import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

import axios from "axios";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.data._id,
      name: data.data.name,
      price: data.data.price,
      image: data.data.images[0].url,
      stock: data.data.stock,
      category: data.data.category,
      quantity,
    },
  });

  // for saving data from reload
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove items from cart

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  // for saving data from reload
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Saving shipping info in store.
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  // for saving data from reload
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

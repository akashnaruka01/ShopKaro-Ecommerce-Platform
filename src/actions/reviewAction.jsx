import {
  ADMIN_REVIEWS_FAIL,
  ADMIN_REVIEWS_REQUEST,
  ADMIN_REVIEWS_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  WRITE_REVIEW_FAIL,
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
} from "../constants/reviewConstant";
import axios from "axios";

export const addNewReview =
  (rating, comment, productId) => async (dispatch) => {
    try {
      dispatch({ type: WRITE_REVIEW_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const data = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/review`,
        { rating, comment, productId },
        config
      );

      dispatch({
        type: WRITE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WRITE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// getting reviewed products.
export const adminReviews = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REVIEWS_REQUEST });
    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/reviewed/product`);

    dispatch({
      type: ADMIN_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get reviews of a particular product.
export const adminProductReviewes = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REVIEWS_REQUEST });

    const data = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?id=${id}`);

    console.log("ajfdkdsa",data);

    dispatch({
      type: ADMIN_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteReviews = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const data = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?productId=${productId}&id=${reviewId}`
    );

    console.log(data);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

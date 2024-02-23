import {
  ADMIN_USERS_FAIL,
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_RESET,
  EDIT_PROFILE_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  login_FAIL,
  login_REQUEST,
  login_SUCCESS,
  register_FAIL,
  register_REQUEST,
  register_SUCCESS,
} from "../constants/userConstant";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case login_REQUEST:
    case register_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
      };
    case login_SUCCESS:
    case register_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        message: "You're logged in successfully",
        user: action.payload,
      };
    case login_FAIL:
    case register_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        message: "Logout successfully",
        isAuthenticated: false,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case EDIT_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case EDIT_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case EDIT_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// admin users reducer
export const allUsersReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case ADMIN_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// update user role
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };

    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_RESET:
    case DELETE_USER_RESET:
      return {
        success: false,
      };

    // case UPDATE_CLEAR_ERROR:
    //   return {
    //     error: null,
    //   };

    default:
      return state;
  }
};

// get user details
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        userDetails: action.payload.user,
      };

    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

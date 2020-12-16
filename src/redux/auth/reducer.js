import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CLEAR_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
} from '../actions';
import { getCookie, deleteCookie } from '../../helpers/Cookies';

const INIT_STATE = {
  user: {
    token: getCookie('user_token'),
    role: getCookie('user_role'),
    username: getCookie('user_username'),
    user_object: undefined,
  },
  forgotUserMail: '',
  newPassword: '',
  resetPasswordCode: '',
  loading: false,
  error: '',
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: '' };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: '',
        error: action.payload.message,
      };
    case FORGOT_PASSWORD:
      return { ...state, loading: true, error: '' };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        forgotUserMail: action.payload,
        error: '',
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        forgotUserMail: '',
        error: action.payload.message,
      };
    case RESET_PASSWORD:
      return { ...state, loading: true, error: '' };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        newPassword: action.payload,
        resetPasswordCode: '',
        error: '',
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        newPassword: '',
        resetPasswordCode: '',
        error: action.payload.message,
      };
    case REGISTER_USER:
      return { ...state, loading: true, error: '' };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, error: '' };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: '',
        error: action.payload.message,
      };
    case LOGOUT_USER:
      deleteCookie('user_token');
      deleteCookie('user_username');
      deleteCookie('user_role');
      return { ...state, user: null, error: '', loading:false };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case UPDATE_PROFILE:
      return { ...state, loading: true, error: '' };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, user: { ...state.user, user_object: action.payload.user,loading:false } };
    default:
      return { ...state };
  }
};

import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Api } from '../../helpers/Api.ts';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  UPDATE_PROFILE,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  updateProfileSuccess,
} from './actions';
import { setCookie } from '../../helpers/Cookies.js';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsyncApi = async (email, password) =>
  await Api.signInWithEmailAndPassword(email, password)
    .then((authUser) => authUser)
    .catch((error) => {
      return { error: error };
    });

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;

  try {
    const user = yield call(loginWithEmailPasswordAsyncApi, email, password);
    if (!user.error) {
      setCookie('user_token', user.token);
      setCookie('user_username', user.username);
      setCookie('user_role', user.role);
      let user_object =
        user.role === 'Merchant'
          ? user.user_object.merchant
          : user.role === 'Consumer'
          ? user.user_object.consumer
          : user.user_object.administrator;
      yield put(
        loginUserSuccess({ ...user, user_object: user_object })
      );
      history.push('/');
    } else {
      if (user.error.message === 'Invalid username or password') {
        yield put(loginUserError('Forkert brugernavn eller kodeord'));
      } else yield put(loginUserError(user.error.message.toString()));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (user) =>
  await Api.createUser(user)
    .then((authUser) => {
      return authUser;
    })
    .catch((error) => {
      return { error: error };
    });

function* registerWithEmailPassword({ payload }) {
  const { history } = payload;
  try {
    const user = yield call(registerWithEmailPasswordAsync, payload.user);
    if (user && !user.error) {
      yield call(loginWithEmailPassword, {
        payload: { history: history, user: user },
      });
      // history.push('/');
    } else {
      yield put(registerUserError(user.error.toString()));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  history.push('/');
};

function* logout({ payload }) {
  const { history } = payload;
  try {
    yield call(logoutAsync, history);
    localStorage.removeItem('user_id');
  } catch (error) {}
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // return await Auth.sendPasswordResetEmail(email)
  //   .then((user) => user)
  //   .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // return await Auth.confirmPasswordReset(resetPasswordCode, newPassword)
  //   .then((user) => user)
  //   .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export function* watchFetchProfile() {
  yield takeEvery(UPDATE_PROFILE, fetchProfile);
}

const fetchProfileAsyncApi = async (locale) => {
  let user = await Api.fetchProfile(locale);
  return user;
};

function* fetchProfile({ payload }) {
  const locale = payload.locale;
  try {
    const user = yield call(fetchProfileAsyncApi, locale);
    if (!user.error) {
      yield put(updateProfileSuccess(user));
    }
  } catch (error) {}
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
    fork(watchFetchProfile),
  ]);
}

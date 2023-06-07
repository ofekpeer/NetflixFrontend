export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const LoginStart = () => ({
  type: LOGIN_START
});

export const LoginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
export const LoginFail = (err) => ({
  type: LOGIN_FAIL,
  payload: err,
});
export const Logout = () => ({
  type: LOGOUT,
});

export const AddToList = (newContentList) => ({
  type: 'ADD_TO_LIST',
  payload: newContentList.data,
})
export const AddToListFail = (err) => ({
  type: 'ADD_TO_LIST_FAIL',
  payload: err,
})

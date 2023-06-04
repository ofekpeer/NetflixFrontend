import { LoginFail, LoginStart, LoginSuccess } from './authAction';
import axios from "axios";

export const loginCall = async (userCred, dispatch) => {
  dispatch(LoginStart());
  console.log(userCred);
  try {
    const res = await axios.post('auth/login', userCred);
    console.log(res.data);
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail());
  } catch (error) {
    dispatch(LoginFail());
  }
};

export const registerCall = async (newUser, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post('auth/register', newUser);
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail());
  } catch (error) {
    dispatch(LoginFail());
  }
};
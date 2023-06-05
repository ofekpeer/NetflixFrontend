import { LoginFail, LoginStart, LoginSuccess } from './authAction';
import axios from "axios";

export const loginCall = async (userCred, dispatch) => {
  dispatch(LoginStart());
  
  try {
    const res = await axios.post('auth/login', userCred);
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail(res));
  } catch (error) {
    dispatch(LoginFail(error));
  }
  console.log(userCred);
};

export const registerCall = async (newUser, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post('auth/register', newUser);
    dispatch(res.data ? LoginSuccess(res.data) : LoginFail(res));
  } catch (error) {
    dispatch(LoginFail(error));
  }
};
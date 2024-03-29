import { AddToList, AddToListFail, LoginFail, LoginStart, LoginSuccess, removeFromList } from './authAction';
import axios from 'axios';

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
    dispatch(res.data ? LoginSuccess({user : res.data}) : LoginFail(res));
  } catch (error) {
    dispatch(LoginFail(error));
  }
};

export const addContent = async (content, user, dispatch) => {
  try {
    const newContentList = await axios.post('auth/addtolist', {//'content/addtolist'
      user,
      content,
    });
    dispatch(AddToList(newContentList));
  } catch (err) {
    dispatch(AddToListFail(err));
  }
};
///////////////////////////////////////////////////
export const removeContent = async (content, user, dispatch) => {
  try {
    const ContentList = await axios.post('auth/removefromlist', {//'content/removefromlist'
      user,
      content,
    });
    dispatch(removeFromList(ContentList));
  } catch (err) {
    dispatch(AddToListFail(err));
  }
};

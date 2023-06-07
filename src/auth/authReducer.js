import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './authAction'

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START: {
      console.log("start");
      return {...state, user: null, isFatching: true, error: null }
    }
    case LOGIN_SUCCESS: {
      console.log(action.payload);
      return { ...state,user: action.payload.user, isFatching: false, error: null,userContentList: action.payload.contentList }
    }
    case LOGIN_FAIL: {
      console.log("fail");

      return { ...state,user: null, isFatching: false, error: action.payload }
    }
    case 'ADD_TO_LIST':{
      let newContentList = action.payload;
       return {...state, userContentList: newContentList}
    }
    case 'ADD_TO_LIST_FAIL':{
       return {...state, error: action.payload.response.data.message}
    }
    case LOGOUT: {
      return { ...state,user: null, isFatching: false, error: null ,userContentList: null}
    }
    default: {
      return { ...state }
    }
  }
}

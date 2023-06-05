import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './authAction'

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_START: {
      console.log("start");
      return { user: null, isFatching: true, error: null }
    }
    case LOGIN_SUCCESS: {
      return { user: action.payload, isFatching: false, error: null }
    }
    case LOGIN_FAIL: {
      console.log("fail");

      return { user: null, isFatching: false, error: action.payload }
    }
    case LOGOUT: {
      return { user: null, isFatching: false, error: null }
    }
    default: {
      return { ...state }
    }
  }
}

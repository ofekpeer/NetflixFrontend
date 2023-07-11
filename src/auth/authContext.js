import { authReducer } from './authReducer';
import { createContext, useEffect, useReducer } from 'react';

const tryParse = (name) => {
  try{
    JSON.parse(localStorage.getItem(name))
    return true
  }
  catch{
   return false
  }
}


const initialState = {
  user:
    localStorage.getItem('user') !== null && tryParse('user') 
      ? JSON.parse(localStorage.getItem('user'))
      : null,
  isFatching: false,
  error: false,
  userContentList:
    localStorage.getItem('usercontentlist') !== null && tryParse('usercontentlist') 
      ? JSON.parse(localStorage.getItem('usercontentlist'))
      : {},
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
    localStorage.setItem(
      'usercontentlist',
      JSON.stringify(state.userContentList)
    );
  }, [state.user, state.userContentList]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFatching: state.isFatching,
        error: state.error,
        userContentList: state.userContentList,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

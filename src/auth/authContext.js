import { authReducer } from './authReducer';
import { createContext, useEffect, useReducer } from 'react';

const f = (name) => {
  try {
    JSON.parse(localStorage.getItem(name));
  } catch {
    return name === 'user' ? null : {};
  }
};

const initialState = {
  user: f('user'),
  isFatching: false,
  error: false,
  userContentList: f('usercontentlist'),
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

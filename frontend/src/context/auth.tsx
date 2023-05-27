import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { logIn } from "../api/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfile } from "../api/user";

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  pwdHash: string,
  email: string,
  city: string,
  street: string,
}

const Context = createContext<{
  isAuth: boolean
  user?: User
  token?: string
  login: () => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
}>({
  isAuth: false,
  logout: () => {
  },
  login: () => {
  }
});

export const AuthContext: React.Component = ({ children }) => {

  const [token, setToken] = useState<string>(sessionStorage.getItem("auth"));
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User>({});
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  const login = (email: string, password: string) => logIn(email, password)
    .then((accessToken) => {
      setToken(accessToken);
      setIsAuth(true);
    });

  useEffect(() => {
    /* tu trzeba sprawdzić czy użytkownik jest zalogowany,
    czyli pobrać na podstawie tokenu
    jego dane i zapisać za pomocą setUser()
    */
    if (!token) {
      return;
    }
    getProfile().then(res => {
      setUser(res.data);
      setIsAuth(true);
    }).catch(() => {
      sessionStorage.clear();
      setToken("");
      setIsAuth(false);
      navigate("/");
      return;
    });
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("auth", token);
    } else {
      sessionStorage.removeItem("auth");
    }
  }, [token]);

  return (
    <Context.Provider value={{
      isAuth,
      user,
      token,
      login,
      logout,
      setUser
    }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);

export const IfAuth: React.Component<{ ifNot?: boolean }> = ({ children, ifNot }) => {
  const { isAuth } = useAuth();
  return (ifNot ? !isAuth : isAuth) && children;
};

export const AuthGuard: React.Component = ({ children }) => {
  const { isAuth } = useAuth();
  if (isAuth) {
    return children;
  }
  return (<Navigate to="/"/>);
};

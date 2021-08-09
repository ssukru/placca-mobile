import { useContext, useState } from "react";
import React, { createContext } from "react";

type User = {
  name: string;
  nickname: string;
  photoUrl: string;
};

type Auth = {
  user: User | null;
  SignIn: (user: User) => boolean;
  SignOut: () => void;
  isAuthorized: boolean;
};

const authContext = createContext<Auth | null>(null);

export const useAuth = (): Auth | null => useContext(authContext);

const ProvideAuth = (): Auth => {
  const [isAuthorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const SignIn = (user: User): boolean => {
    if (user) {
      setUser(user);
      setAuthorized(true);
      return true;
    }
    return false;
  };

  const SignOut = (): void => {
    setUser(null);
    setAuthorized(false);
  };

  return {
    SignIn,
    SignOut,
    user,
    isAuthorized,
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = ProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

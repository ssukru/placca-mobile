import { useContext, useState } from "react";
import { createContext } from "react";

type User = {
  name: string;
  nickname: string;
  photoUrl: string;
};

type Auth = {
  user: User | null;
  SignIn: (user: User) => boolean;
  SignOut: () => boolean;
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
    } else {
      return false;
    }
    return true;
  };

  const SignOut = (): boolean => {
    setUser(null);
    setAuthorized(false);
    return true;
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

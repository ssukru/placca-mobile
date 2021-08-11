import React, { createContext, useContext, useState } from "react";
import { auth as firebaseAuth } from "../utils/firebase";
import firebase from "firebase";

type User = {
  name: string | null | undefined;
  uid: string | null | undefined;
  photoUrl: string | null | undefined;
};

type Auth = {
  user: User | null;
  SignInAnonymous: () => void;
  SignIn: () => void;
  SignOut: () => void;
  isAuthorized: boolean;
};

const authContext = createContext<Auth | null>(null);

export const useAuth = (): Auth | null => useContext(authContext);

const ProvideAuth = (): Auth => {
  const [isAuthorized, setAuthorized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const handleUser = (result: firebase.auth.UserCredential) => {
    if (result) {
      setUserInfo({
        name: result.user?.isAnonymous
          ? `anon-${result.user?.uid}`
          : result.user?.displayName,
        uid: result.user?.uid,
        photoUrl: result.user?.photoURL,
      });
      setAuthorized(true);
    } else {
      setUserInfo(null);
      setAuthorized(false);
    }
  };

  const SignInAnonymous = async () => {
    firebaseAuth()
      .signInAnonymously()
      .then((result) => {
        setUserInfo({
          name: result.user?.isAnonymous
            ? `anon-${result.user?.uid}`
            : result.user?.displayName,
          uid: result.user?.uid,
          photoUrl: result.user?.photoURL,
        });
        setAuthorized(true);
        return true;
      })
      .catch((result) => {
        console.log(result);
        setUserInfo(null);
        setAuthorized(false);
        return false;
      });
  };

  const SignIn = async () => {
    firebaseAuth()
      .signInAnonymously()
      .then((result) => {
        setUserInfo({
          name: result.user?.isAnonymous
            ? `anon-${result.user?.uid}`
            : result.user?.displayName,
          uid: result.user?.uid,
          photoUrl: result.user?.photoURL,
        });
        setAuthorized(true);
        return true;
      })
      .catch((result) => {
        console.log(result);
        setUserInfo(null);
        setAuthorized(false);
        return false;
      });
  };

  const SignOut = (): void => {
    firebaseAuth().signOut();
    setUserInfo(null);
    setAuthorized(false);
  };

  React.useEffect((): firebase.Unsubscribe => {
    const clear = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo({
          name: user?.isAnonymous ? `anon-${user?.uid}` : user?.displayName,
          uid: user?.uid,
          photoUrl: user?.photoURL,
        });
        setAuthorized(true);
        console.log(userInfo);
      } else {
        setUserInfo(null);
        setAuthorized(false);
      }
    });

    return () => clear;
  }, []);

  return {
    SignInAnonymous,
    SignIn,
    SignOut,
    user: userInfo,
    isAuthorized,
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = ProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

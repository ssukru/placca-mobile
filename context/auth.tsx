import React, { createContext, useContext, useState } from "react";
import { auth as firebaseAuth, firestore } from "../utils/firebase";
import firebase from "firebase";

type User = {
  name: string | undefined;
  isAnonymous: boolean | undefined;
  uid: string | undefined;
  photoUrl: string | undefined;
  city: string | undefined;
  addedCommentsCount: number | undefined;
};

type Auth = {
  user: User | null;
  SignInAnonymous: () => void;
  LinkAnonymousAccountWithEmail: (
    email: string,
    pw: string,
    name: string,
    city: string,
    linkComments: boolean
  ) => void;
  RegisterWithEmail: (
    email: string,
    pw: string,
    name: string,
    city: string
  ) => void;
  SignIn: (email: string, pw: string) => void;
  SignOut: () => void;
  authLoading: boolean;
  isAuthorized: boolean;
};

const authContext = createContext<Auth | null>(null);

export const useAuth = (): Auth | null => useContext(authContext);

const ProvideAuth = (): Auth => {
  const [isAuthorized, setAuthorized] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const SignInAnonymous = async () => {
    setLoading(true);
    firebaseAuth().signInAnonymously();
  };

  const LinkAnonymousAccountWithEmail = (
    email: string,
    pw: string,
    name: string,
    city: string,
    linkComments: boolean
  ) => {
    setLoading(true);
    const credential = firebaseAuth.EmailAuthProvider.credential(email, pw);
    firebaseAuth()
      .currentUser?.linkWithCredential(credential)
      .then((usercred) => {
        if (linkComments) {
          firestore()
            .collectionGroup("comments")
            .where("commenterUid", "==", usercred.user?.uid)
            .get()
            .then((result) => {
              if (result.size > 0) {
                result.forEach((doc) => {
                  doc.ref.update({
                    commenterName: name,
                    isAnonymous: false,
                  });
                });
              }
              firestore()
                .collection("users")
                .doc(usercred.user?.uid)
                .set({
                  name: name,
                  city: city,
                  email: email,
                  addedCommentsCount: result.size,
                  photoUrl: "",
                })
                .then(() => {
                  alert(
                    "hesabınız başarıyla oluşturuldu. lütfen tekrar giriş yapın."
                  );
                  SignOut();
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        } else {
          firestore()
            .collection("users")
            .doc(usercred.user?.uid)
            .set({
              name: name,
              city: city,
              email: email,
              addedCommentsCount: 0,
              photoUrl: "",
            })
            .then(() => {
              alert(
                "hesabınız başarıyla oluşturuldu. lütfen tekrar giriş yapın."
              );
              SignOut();
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  const RegisterWithEmail = (
    email: string,
    pw: string,
    name: string,
    city: string
  ) => {
    setLoading(true);
    firebaseAuth()
      .createUserWithEmailAndPassword(email, pw)
      .then((usercred) => {
        firestore()
          .collection("users")
          .doc(usercred.user?.uid)
          .set({
            name: name,
            city: city,
            email: email,
            addedCommentsCount: 0,
            photoUrl: "",
          })
          .then(() => {
            alert("hesabınız başarıyla oluşturuldu.");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const SignIn = async (email: string, pw: string) => {
    setLoading(true);
    firebaseAuth().signInWithEmailAndPassword(email, pw);
  };

  const SignOut = (): void => {
    setLoading(true);
    firebaseAuth().signOut();
  };

  React.useEffect((): firebase.Unsubscribe => {
    const unsub = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        if (!user.isAnonymous) {
          firestore()
            .collection("users")
            .doc(user.uid)
            .onSnapshot((result) => {
              setUserInfo({
                name: result.data()?.name,
                uid: user?.uid,
                photoUrl: result.data()?.photoUrl,
                isAnonymous: false,
                city: result.data()?.city,
                addedCommentsCount: result.data()?.addedCommentsCount,
              });
              setAuthorized(true);
              setLoading(false);
            });
        } else {
          setUserInfo({
            name: `anon-${user?.uid}`,
            uid: user?.uid,
            photoUrl: "",
            isAnonymous: user?.isAnonymous,
            city: "anonimcity",
            addedCommentsCount: 0,
          });
          setAuthorized(true);
          setLoading(false);
        }
      } else {
        setUserInfo(null);
        setAuthorized(false);
        setLoading(false);
      }
    });

    return () => unsub;
  }, []);

  return {
    SignInAnonymous,
    LinkAnonymousAccountWithEmail,
    RegisterWithEmail,
    SignIn,
    SignOut,
    authLoading: loading,
    user: userInfo,
    isAuthorized,
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = ProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

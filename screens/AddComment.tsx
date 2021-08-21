import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";

import Input from "../components/input";
import Container from "../components/container";
import { firestore } from "../utils/firebase";
import { useAuth } from "../context/auth";
import { Button } from "../components/button";

const AddComment = () => {
  const [plaka, setPlaka] = useState<string>("");
  const [yorum, setYorum] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useAuth();

  const handleSubmit = () => {
    if (plaka.length < 7 || plaka.length > 9) {
      Alert.alert(
        "hatalı plaka",
        "lütfen doğru plakayı girdiğinize emin olun.",
        [{ text: "tamam" }]
      );
      return;
    }
    if (yorum.length < 6 || plaka.length > 255) {
      Alert.alert(
        "eksik/fazla karakter",
        "lütfen yorumunuz 6 ila 255 karakter arasında olsun.",
        [{ text: "tamam" }]
      );
      return;
    }
    setLoading(true);
    firestore()
      .collection("plates")
      .doc(plaka.toLowerCase())
      .collection("comments")
      .add({
        comment: yorum,
        commenterName: auth?.user?.name,
        commenterUid: auth?.user?.uid,
        plate: plaka,
        time: firestore.Timestamp.now(),
        isAnonymous: auth?.user?.isAnonymous,
      })
      .then((result) => {
        firestore()
          .collection("plates")
          .doc(plaka.toLowerCase())
          .set(
            {
              commentCount: firestore.FieldValue.increment(1),
            },
            { merge: true }
          )
          .then(() => {
            if (!auth?.user?.isAnonymous) {
              firestore()
                .collection("users")
                .doc(auth?.user?.uid)
                .set(
                  {
                    addedCommentsCount: firestore.FieldValue.increment(1),
                  },
                  { merge: true }
                )
                .then((result) => {
                  alert("yorumunuz başarıyla gönderildi.");
                  setPlaka("");
                  setYorum("");
                  setLoading(false);
                });
            } else {
              alert("yorumunuz başarıyla gönderildi.");
              setPlaka("");
              setYorum("");
              setLoading(false);
            }
          })
          .catch((error) => {
            alert(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });

    return;
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "100%" }}
      >
        <Input
          isMultiline={false}
          placeholder="plaka"
          value={plaka}
          onChangeText={setPlaka}
          returnButtonType="done"
          onSubmit={() => {}}
          capitalize
        />
        <Input
          capitalize={false}
          placeholder="yorum"
          isMultiline
          value={yorum}
          onChangeText={setYorum}
          returnButtonType="send"
          onSubmit={handleSubmit}
        />
        <Button text="gönder" onPress={handleSubmit} loading={loading} />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddComment;

import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Container, Input } from "../components";

import { firestore } from "../utils/firebase";
import { useAuth } from "../context/auth";

import PlateCheck from "../utils/plateCheck";

const AddComment = () => {
  const [plaka, setPlaka] = useState<string>("");
  const [yorum, setYorum] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useAuth();

  const handleSubmit = () => {
    let plate = plaka;
    const result = PlateCheck(plate);
    if (!result.result) {
      alert(result.error);
      return;
    }
    const trMap: { [key: string]: string } = {
      çÇ: "c",
      ğĞ: "g",
      şŞ: "s",
      üÜ: "u",
      ıİ: "i",
      öÖ: "o",
    };
    for (const key in trMap) {
      plate = plate.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
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
      .doc(plaka.toUpperCase())
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
          .doc(plaka.toUpperCase())
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

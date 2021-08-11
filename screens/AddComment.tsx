import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import Input from "../components/input";
import Container from "../components/container";
import { firestore } from "../utils/firebase";
import { useAuth } from "../context/auth";

const AddComment = () => {
  const [plaka, setPlaka] = useState<string>("");
  const [yorum, setYorum] = useState<string>("");

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
    firestore()
      .collection("plakalar")
      .doc(plaka.toLowerCase())
      .set(
        {
          yorumlar: firestore.FieldValue.arrayUnion({
            yorum: yorum,
            yorumcu: auth?.user,
            time: firestore.Timestamp.now(),
          }),
        },
        { merge: true }
      );

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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>gönder</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#FF4C29",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
  },
});

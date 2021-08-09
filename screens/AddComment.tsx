import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import Input from "../components/input";
import { useState } from "react";
import Container from "../components/container";

const AddComment = () => {
  const [plaka, setPlaka] = useState<string>("");
  const [yorum, setYorum] = useState<string>("");
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
        />
        <Input
          placeholder="yorum"
          isMultiline
          value={yorum}
          onChangeText={setYorum}
          returnButtonType="send"
          onSubmit={() => {}}
        />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
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

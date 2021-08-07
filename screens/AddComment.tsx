import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const DismissKeyboard: React.FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const AddComment = () => {
  return (
    <SafeAreaView>
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          >
            <LinearGradient
              colors={["#f7f7f7", "#ffffff"]}
              style={styles.input}
            >
              <TextInput placeholder="plaka" />
            </LinearGradient>
            <LinearGradient
              colors={["#f7f7f7", "#ffffff"]}
              style={styles.input}
            >
              <TextInput multiline placeholder="yorum" />
            </LinearGradient>
            <TouchableOpacity
              style={{
                ...styles.input,
                backgroundColor: "#FF4C29",
                alignItems: "center",
              }}
            >
              <Text style={styles.buttonText}>gönder</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
  },
});

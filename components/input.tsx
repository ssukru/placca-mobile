import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  value: string;
  isMultiline: boolean;
  onChangeText: (text: string) => void;
};

const Input = ({ placeholder, value, isMultiline, onChangeText }: Props) => {
  return (
    <LinearGradient colors={["#f7f7f7", "#ffffff"]} style={styles.input}>
      <TextInput
        multiline={isMultiline}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        autoCapitalize="characters"
      />
    </LinearGradient>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
});

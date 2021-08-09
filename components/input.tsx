import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  placeholder: string;
  value: string;
  isMultiline: boolean;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  returnButtonType: ReturnKeyTypeOptions;
};

const Input = ({
  placeholder,
  value,
  isMultiline,
  onChangeText,
  onSubmit,
  returnButtonType,
}: Props) => {
  return (
    <LinearGradient colors={["#f7f7f7", "#ffffff"]} style={styles.input}>
      <TextInput
        multiline={isMultiline}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        autoCapitalize="characters"
        style={{ width: "100%", padding: 12, paddingTop: 12 }}
        onSubmitEditing={returnButtonType === "send" ? onSubmit : () => {}}
        returnKeyType={returnButtonType}
      />
    </LinearGradient>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderRadius: 6,
    marginBottom: 12,
    justifyContent: "center",
  },
});

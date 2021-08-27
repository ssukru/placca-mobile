import React from "react";
import {
  ReturnKeyTypeOptions,
  KeyboardType,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Text,
} from "react-native";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isMultiline?: boolean;
  onSubmit?: () => void;
  returnButtonType?: ReturnKeyTypeOptions;
  capitalize?: boolean;
  secret?: boolean;
  additionalViewStyle?: StyleProp<ViewStyle>;
  additionalTextStyle?: StyleProp<TextStyle>;
  placeHolderColor?: string;
  keyboardType?: KeyboardType;
};

const Input = ({
  placeholder,
  value,
  isMultiline = false,
  onChangeText,
  onSubmit = () => {},
  returnButtonType = "done",
  capitalize = false,
  secret = false,
  additionalViewStyle = {},
  additionalTextStyle = {},
  placeHolderColor = "#bbb",
  keyboardType = "default",
}: Props) => {
  return (
    <View style={[styles.input, additionalViewStyle]}>
      <TextInput
        keyboardType={keyboardType}
        multiline={isMultiline}
        placeholder={placeholder}
        placeholderTextColor={placeHolderColor}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        autoCapitalize={capitalize ? "characters" : "none"}
        style={[
          { width: "100%", padding: 12, paddingTop: 12 },
          additionalTextStyle,
        ]}
        onSubmitEditing={returnButtonType === "send" ? onSubmit : () => {}}
        returnKeyType={returnButtonType}
        secureTextEntry={secret}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
  },
});

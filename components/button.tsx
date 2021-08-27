import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  text: string;
  onPress?: () => void;
  additionalViewStyle?: StyleProp<ViewStyle>;
  additionalTextStyle?: StyleProp<TextStyle>;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  text,
  onPress,
  color = "#fff",
  additionalViewStyle = {},
  additionalTextStyle = {},
  disabled = false,
  loading = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.buttonBackground,
        additionalViewStyle,
        disabled && { backgroundColor: "#a0a0a0" },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          style={[styles.buttonText, { color: color }, additionalTextStyle]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBackground: {
    backgroundColor: "#FF4C29",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
  },
  anonimText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 12,
    textAlign: "center",
  },
});

type TextButtonProps = {
  text: string;
  boldText?: string;
  onPress?: () => void;
  color?: string;
  loading?: boolean;
};

const TextButton = ({
  text,
  boldText,
  onPress = () => {},
  loading = false,
  color = "#666",
}: TextButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.anonimText, { color: color }]}>
          {text}
          <Text style={{ fontWeight: "bold" }}>{boldText}</Text>
        </Text>
      )}
    </TouchableOpacity>
  );
};

export { Button, TextButton };

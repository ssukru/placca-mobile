import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DismissKeyboard: React.FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Container: React.FC = ({ children }) => {
  return (
    <SafeAreaView>
      <DismissKeyboard>
        <View style={styles.container}>{children}</View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default Container;

export const ContainerWithoutSafeArea: React.FC = ({ children }) => {
  return (
    <DismissKeyboard>
      <View style={styles.container}>{children}</View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
    alignItems: "center",
  },
});

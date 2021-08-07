import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

const StyledSafeArea: React.FC = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.view}>{children}</View>
    </SafeAreaView>
  );
};

export default StyledSafeArea;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#29339B",
  },
  view: {
    paddingHorizontal: 16,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: 32,
  },
});

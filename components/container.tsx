import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
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

type Props = {
  children: React.ReactNode;
  paddingHorizontal?: number;
  paddingVertical?: number;
  useBottomTabHeight?: boolean;
};
const Container = ({
  children,
  paddingHorizontal = 16,
  paddingVertical = 16,
  useBottomTabHeight = true,
}: Props) => {
  const tabBarHeight = useBottomTabHeight
    ? useBottomTabBarHeight() * 2 + 24
    : 0;

  return (
    <SafeAreaView>
      <DismissKeyboard>
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: paddingHorizontal,
              paddingVertical: paddingVertical,
              paddingBottom: tabBarHeight,
            },
          ]}
        >
          {children}
        </View>
      </DismissKeyboard>
    </SafeAreaView>
  );
};

export default Container;

export const ContainerWithoutSafeArea = ({
  children,
  paddingHorizontal = 16,
  paddingVertical = 16,
  useBottomTabHeight = true,
}: Props) => {
  const tabBarHeight = useBottomTabHeight ? useBottomTabBarHeight() + 32 : 0;

  return (
    <DismissKeyboard>
      <View
        style={[
          styles.container,
          {
            paddingHorizontal: paddingHorizontal,
            paddingVertical: paddingVertical,
            paddingBottom: tabBarHeight,
          },
        ]}
      >
        {children}
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
});

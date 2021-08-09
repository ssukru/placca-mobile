import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Navigation from "./navigation";
import { useColorScheme, StatusBar } from "react-native";
import { AuthProvider } from "./context/auth";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

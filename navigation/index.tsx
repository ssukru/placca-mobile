import React from "react";
import { View, Text, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/auth";
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddComment from "../screens/AddComment";

const Nav = () => {
  const AuthStack = createNativeStackNavigator();
  const NormalTab = createBottomTabNavigator();

  const isAuthorized = useAuth()?.isAuthorized;
  const signout = useAuth()?.SignOut;

  return (
    <>
      {isAuthorized ? (
        <NormalTab.Navigator>
          <NormalTab.Screen
            options={{
              headerRight: () => {
                // TODO: çöz bunu
                return <Button title="çıkış yap" onPress={signout} />;
              },
            }}
            name="ana sayfa"
            component={Home}
          />
          <NormalTab.Screen name="yorum ekle" component={AddComment} />
          <NormalTab.Screen name="profil" component={Profile} />
        </NormalTab.Navigator>
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="welcome" component={Welcome} />
        </AuthStack.Navigator>
      )}
    </>
  );
};

export default Nav;

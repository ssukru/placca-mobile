import React from "react";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../context/auth";
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddComment from "../screens/AddComment";
import { Icon } from "react-native-elements";
import Plate from "../screens/Plate";
import Register from "../screens/Register";
import Login from "../screens/Login";

export type HomeStackParams = {
  AnaSayfaStack: undefined;
  PlakaDetay: { plate: string };
};

export type ProfileStackParams = {
  ProfilStack: undefined;
  PlakaDetay: { plate: string };
  Kayit: undefined;
};

export type AuthStackParams = {
  Welcome: undefined;
  Register: undefined;
  Login: undefined;
};

const Nav = () => {
  const AuthStack = createNativeStackNavigator<AuthStackParams>();
  const NormalTab = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator<HomeStackParams>();
  const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

  const auth = useAuth();

  const HomeScreens = () => {
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen
          options={{ title: "ana sayfa" }}
          name="AnaSayfaStack"
          component={Home}
        />
        <HomeStack.Screen
          options={{
            headerShown: true,
            title: "plaka detay",
            headerTintColor: "#4EE6AA",
            headerTitleStyle: {
              color: "#000",
            },
            headerBackTitle: "ana sayfa",
          }}
          name="PlakaDetay"
          component={Plate}
        />
      </HomeStack.Navigator>
    );
  };

  const ProfileScreens = () => {
    const auth = useAuth();

    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          options={{
            title: "profil",
            headerLeft: () => {
              return (
                <Button
                  color="#4EE6AA"
                  title="çıkış yap"
                  onPress={() => auth?.SignOut()}
                />
              );
            },
            headerRight: () => {
              return (
                <Button
                  color={auth?.user?.isAnonymous ? "#ddd" : "#4EE6AA"}
                  title="düzenle"
                  onPress={() => {
                    if (auth?.user?.isAnonymous) {
                      alert("önce gerçek bir profil oluşturmalısın");
                    } else {
                      alert("bi olayı yok şu an");
                    }
                  }}
                />
              );
            },
          }}
          name="ProfilStack"
          component={Profile}
        />
        <ProfileStack.Screen
          name="PlakaDetay"
          options={{
            title: "plaka detay",
            headerShown: true,
            headerTintColor: "#4EE6AA",
          }}
          component={Plate}
        />
        <ProfileStack.Screen
          name="Kayit"
          options={{
            title: "kayıt ol",
            headerBackTitle: "profil",
            headerTintColor: "#4EE6AA",
            headerTitleStyle: {
              color: "#000",
            },
            headerShown: true,
          }}
          component={Register}
        />
      </ProfileStack.Navigator>
    );
  };

  if (auth?.isAuthorized) {
    return (
      <NormalTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#4EE6AA",
          tabBarShowLabel: false,
          tabBarInactiveTintColor: "#d5d5d5",
          headerShown: false,
        }}
        initialRouteName="ana sayfa"
      >
        <NormalTab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                type="ionicon"
                name={focused ? "home" : "home-outline"}
                size={30}
                color={color}
              />
            ),
          }}
          name="ana sayfa"
          component={HomeScreens}
        />
        <NormalTab.Screen
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                type="ionicon"
                name={focused ? "add-circle" : "add"}
                size={33}
                color={color}
              />
            ),
          }}
          name="yorum ekle"
          component={AddComment}
        />
        <NormalTab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                type="ionicon"
                name={focused ? "person-circle" : "person-circle-outline"}
                size={33}
                color={color}
              />
            ),
          }}
          name="profil"
          component={ProfileScreens}
        />
      </NormalTab.Navigator>
    );
  } else {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: true }}>
        <AuthStack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={Welcome}
        />
        <AuthStack.Screen
          name="Register"
          options={{
            headerBackTitle: "geri",
            headerTintColor: "#4EE6AA",
            headerTitleStyle: {
              color: "#000",
            },
            title: "kayıt ol",
          }}
          component={Register}
        />
        <AuthStack.Screen
          name="Login"
          options={{
            headerBackTitle: "geri",
            headerTintColor: "#4EE6AA",
            headerTitleStyle: {
              color: "#000",
            },
            title: "giriş",
          }}
          component={Login}
        />
      </AuthStack.Navigator>
    );
  }
};

export default Nav;

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, TextButton } from "../components";
import { useAuth } from "../context/auth";
import { AuthStackParams } from "../navigation";

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParams,
  "Welcome"
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const Welcome = ({ navigation }: Props) => {
  const auth = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>placca</Text>
          <Text style={styles.subTitle}>trafikteki araçlara yorum yap!</Text>
        </View>
        <View style={{}}>
          {auth?.authLoading ? (
            <>
              <ActivityIndicator />
            </>
          ) : (
            <>
              <Button
                text="giriş yap"
                onPress={() => navigation.navigate("Login")}
              />
              <Button
                text="kayıt ol"
                onPress={() => navigation.navigate("Register")}
                additionalViewStyle={{ backgroundColor: "#4EE6AA" }}
              />
              <TextButton
                text="veya anonim olarak"
                boldText=" devam et."
                onPress={() => auth?.SignInAnonymous()}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    paddingHorizontal: 16,
    height: "100%",
    paddingVertical: 4,
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
    color: "#4EE6AA",
    textTransform: "uppercase",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#159965",
    marginBottom: 36,
  },
  signinButton: {
    backgroundColor: "#FF4C29",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 4,
    alignItems: "center",
  },
  signinButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
  },
  anonimText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 6,
    textAlign: "center",
  },
  titleWrapper: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

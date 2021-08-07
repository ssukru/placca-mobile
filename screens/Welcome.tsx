import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/auth";

const Welcome: React.FC = () => {
  const auth = useAuth();

  const user = {
    name: "Şükrü Ünal",
    nickname: "sukru",
    photoUrl: "test.com/photo.png",
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>plaka app</Text>
        <Text style={styles.subTitle}>trafikteki araçlara yorum yap!</Text>
        <TouchableOpacity
          onPress={() => {
            auth?.SignIn(user);
          }}
          style={styles.signinButton}
        >
          <Text style={styles.signinButtonText}>giriş yap</Text>
        </TouchableOpacity>
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingVertical: 32,
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
    marginBottom: 12,
  },
  signinButton: {
    backgroundColor: "#FF4C29",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  signinButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
  },
});

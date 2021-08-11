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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>plaka app</Text>
          <Text style={styles.subTitle}>trafikteki araçlara yorum yap!</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              auth?.SignIn();
            }}
            style={styles.signinButton}
          >
            <Text style={styles.signinButtonText}>giriş yap</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => auth?.SignInAnonymous()}>
            <Text style={styles.anonimText}>
              veya anonim olarak{" "}
              <Text style={{ fontWeight: "bold" }}>devam et.</Text>
            </Text>
          </TouchableOpacity>
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

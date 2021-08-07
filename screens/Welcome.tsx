import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StyledSafeArea from "../components/StyledSafeArea";
import { useAuth } from "../context/auth";

const Welcome: React.FC = () => {
  const auth = useAuth();

  const user = {
    name: "Şükrü Ünal",
    nickname: "sukru",
    photoUrl: "test.com/photo.png",
  };
  return (
    <StyledSafeArea>
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
    </StyledSafeArea>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontWeight: "600",
    color: "#F1FEC6",
    textTransform: "uppercase",
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#B6D6CC",
    marginBottom: 12,
  },
  signinButton: {
    backgroundColor: "#FF3A20",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginLeft: "auto",
    borderRadius: 6,
  },
  signinButtonText: {
    color: "#F1FEC6",
    fontSize: 24,
    fontWeight: "300",
  },
});

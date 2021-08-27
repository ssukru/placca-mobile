import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, ContainerWithoutSafeArea, Input } from "../components";
import { useAuth } from "../context/auth";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const auth = useAuth();

  const handleLogin = () => {
    if (email === "" || pw === "") {
      alert("lütfen alanları boş bırakmadığınıza emin olun.");
      return;
    }

    auth?.SignIn(email, pw);
  };

  return (
    <ContainerWithoutSafeArea useBottomTabHeight={false}>
      <View style={styles.container}>
        <Input
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnButtonType="next"
        />
        <Input
          placeholder="şifre"
          returnButtonType="send"
          secret
          value={pw}
          onChangeText={setPw}
        />
        <Button
          text="giriş yap"
          onPress={handleLogin}
          loading={auth?.authLoading}
        />
      </View>
    </ContainerWithoutSafeArea>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

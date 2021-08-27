import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { useAuth } from "../context/auth";
import { ProfileStackParams } from "../navigation";
import { ContainerWithoutSafeArea, Input, Button } from "../components";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParams,
  "ProfilStack"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Register = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwConfirm, setPwConfirm] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [linkComments, setLinkComments] = useState<boolean>(false);

  const auth = useAuth();

  const Register = () => {
    if (
      email === "" ||
      pw === "" ||
      pwConfirm === "" ||
      name === "" ||
      city === "" ||
      pw !== pwConfirm
    )
      return;

    if (auth?.user?.isAnonymous) {
      auth?.LinkAnonymousAccountWithEmail(email, pw, name, city, linkComments);
    } else {
      auth?.RegisterWithEmail(email, pw, name, city);
    }
  };

  return (
    <ContainerWithoutSafeArea useBottomTabHeight={false}>
      <View style={styles.container}>
        <Input
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input placeholder="şifre" value={pw} onChangeText={setPw} secret />
        <Input
          placeholder="şifre tekrar"
          value={pwConfirm}
          onChangeText={setPwConfirm}
          secret
        />
        <Input placeholder="ad soyad" value={name} onChangeText={setName} />
        <Input placeholder="şehir" value={city} onChangeText={setCity} />

        {auth?.user?.isAnonymous && (
          <CheckBox
            center
            title="eski yorumları hesabıma iliştir."
            checkedColor="#FF4C29"
            textStyle={{ color: "#444" }}
            containerStyle={{ width: "100%", marginTop: 0, marginBottom: 12 }}
            checked={linkComments}
            onPress={() => setLinkComments(!linkComments)}
          />
        )}
        <Button
          text="devam"
          loading={auth?.authLoading}
          onPress={Register}
          disabled={
            email === "" ||
            pw === "" ||
            pwConfirm === "" ||
            name === "" ||
            city === "" ||
            pw !== pwConfirm
          }
        />
      </View>
    </ContainerWithoutSafeArea>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

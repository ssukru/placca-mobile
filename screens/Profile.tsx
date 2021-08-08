import React from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import Comment from "../components/comment";
import { ContainerWithoutSafeArea } from "../components/container";

const Redirect = () => {
  return;
};

const data = [
  {
    id: "1",
    onPress: Redirect,
    plaka: "48AGB465",
    yorumcu: "ŞÜKRÜ ÜNAL",
    yorum: "ne kadar duyarlı bir sürücü 🥰",
  },
  {
    id: "2",
    onPress: Redirect,
    plaka: "15HC959",
    yorumcu: "ŞÜKRÜ ÜNAL",
    yorum: "araba yavaş gidiyo sanki biraz?",
  },
];

const Profile = () => {
  return (
    <ContainerWithoutSafeArea>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={styles.head}>
          <Image
            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
            style={{ height: 64, width: 64, marginRight: 12 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.text}>Şükrü Ünal</Text>
            <Text style={{ marginTop: 2 }}>Denizli</Text>
          </View>
        </View>
        <Text>2 adet yorum bulundu:</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Comment
              onPress={item.onPress}
              yorum={item.yorum}
              yorumcu={item.yorumcu}
              plaka={item.plaka}
            />
          )}
        />
      </View>
    </ContainerWithoutSafeArea>
  );
};

export default Profile;

const styles = StyleSheet.create({
  head: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});

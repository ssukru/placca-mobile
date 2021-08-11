import React from "react";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Container from "../components/container";
import Input from "../components/input";
import Comment from "../components/comment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../navigation";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "AnaSayfaStack"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const [plaka, setPlaka] = useState<string>("");

  const Redirect = () => {
    return;
  };

  const data = [
    {
      id: "1",
      onPress: Redirect,
      plaka: "48AGB465",
      yorumcu: "ŞÜKRÜ ÜNAL",
      yorum:
        "ne kadar duyarlı bir sürücü 🥰 ne kadar duyarlı bir sürücü 🥰 ne kadar duyarlı bir sürücü 🥰",
    },
    {
      id: "2",
      onPress: Redirect,
      plaka: "15HC959",
      yorumcu: "ŞÜKRÜ ÜNAL",
      yorum: "araba yavaş gidiyo sanki biraz?",
    },
    {
      id: "3",
      onPress: Redirect,
      plaka: "15HK848",
      yorumcu: "ŞABAN ÜNAL",
      yorum: "burası neresi",
    },
  ];

  return (
    <Container>
      <Input
        capitalize
        placeholder="plaka ara"
        value={plaka}
        onChangeText={setPlaka}
        isMultiline={false}
        returnButtonType="send"
        onSubmit={() => alert(plaka)}
      />
      <View style={{ width: "100%" }}>
        <Text style={{ marginTop: 8, marginBottom: 4, color: "#159965" }}>
          son eklenen yorumlar
        </Text>
        <FlatList
          style={{ height: "100%", width: "100%", paddingHorizontal: 1 }}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Comment
              onPress={() => navigation.navigate("PlakaDetay")}
              yorum={item.yorum}
              yorumcu={item.yorumcu}
              plaka={item.plaka}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});

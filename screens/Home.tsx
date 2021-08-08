import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Container from "../components/container";
import Input from "../components/input";
import Comment from "../components/comment";

const Home = () => {
  const [plaka, setPlaka] = useState<string>("");

  const Redirect = () => {
    return;
  };

  return (
    <Container>
      <Input
        placeholder="plaka ara"
        value={plaka}
        onChangeText={setPlaka}
        isMultiline={false}
        returnButtonType="send"
        onSubmit={() => alert(plaka)}
      />
      <View style={{ width: "100%" }}>
        <Text style={{ marginTop: 12, marginBottom: 4, color: "#159965" }}>
          son eklenen yorumlar
        </Text>
        <Comment
          onPress={Redirect}
          plaka="48AGB465"
          yorumcu="ŞÜKRÜ ÜNAL"
          yorum="ne kadar duyarlı bir sürücü 🥰"
        />
        <Comment
          onPress={Redirect}
          plaka="15HC959"
          yorumcu="ŞÜKRÜ ÜNAL"
          yorum="araba yavaş gidiyo sanki biraz?"
        />
        <Comment
          onPress={Redirect}
          plaka="15HK848"
          yorumcu="ŞABAN ÜNAL"
          yorum="burası neresi"
        />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});

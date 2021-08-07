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
      />
      <View style={{ width: "100%" }}>
        <Text>son eklenen yorumlar</Text>
        <Comment
          onPress={Redirect}
          plaka="48AGB465"
          yorumcu="ŞÜKRÜ ÜNAL"
          yorum="alet nalet"
        />
        <Comment
          onPress={Redirect}
          plaka="15HC959"
          yorumcu="ŞÜKRÜ ÜNAL"
          yorum="alet nalet"
        />
        <Comment
          onPress={Redirect}
          plaka="15HK848"
          yorumcu="ŞABAN ÜNAL"
          yorum="TERBİYESİZ"
        />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});

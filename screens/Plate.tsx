import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Comment, { CommentNoTouch } from "../components/comment";
import { ContainerWithoutSafeArea } from "../components/container";

const data = [
  {
    id: "1",
    yorumcu: "ŞÜKRÜ ÜNAL",
    yorum:
      "ne kadar duyarlı bir sürücü 🥰 ne kadar duyarlı bir sürücü 🥰 ne kadar duyarlı bir sürücü 🥰 ",
  },
];

const Plate = () => {
  return (
    <ContainerWithoutSafeArea>
      <View style={{ width: "100%", height: "100%" }}>
        <Text style={styles.plateText}>48AGB465</Text>
        <Text style={{ marginTop: 8, marginBottom: 4, color: "#159965" }}>
          toplam 1 yorum bulundu.
        </Text>
        <FlatList
          keyExtractor={(item) => item.id}
          style={{ height: "100%", width: "100%", paddingHorizontal: 1 }}
          data={data}
          renderItem={({ item }) => (
            <CommentNoTouch yorum={item.yorum} yorumcu={item.yorumcu} />
          )}
        />
      </View>
    </ContainerWithoutSafeArea>
  );
};

export default Plate;

const styles = StyleSheet.create({
  plateText: {
    fontSize: 36,
    fontWeight: "bold",
  },
});

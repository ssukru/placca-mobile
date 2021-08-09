import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Yorum = {
  plaka: string;
  yorumcu: string;
  yorum: string;
  onPress: () => void;
};

type YorumNoTouch = {
  yorumcu: string;
  yorum: string;
};

const Comment = ({ plaka, yorumcu, yorum, onPress }: Yorum) => {
  return (
    <TouchableOpacity style={styles.yorumBackground} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
          {yorumcu}
        </Text>
        <Text style={{ color: "#159965", fontWeight: "500" }}>@{plaka}</Text>
      </View>

      <Text
        numberOfLines={4}
        style={{
          marginTop: 6,
          fontSize: 14,
          fontStyle: "italic",
          color: "#333",
        }}
      >
        {yorum}
      </Text>
    </TouchableOpacity>
  );
};

export default Comment;

export const CommentNoTouch = ({ yorum, yorumcu }: YorumNoTouch) => {
  return (
    <View style={styles.yorumBackground}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>
          {yorumcu}
        </Text>
      </View>

      <Text
        style={{
          marginTop: 6,
          fontSize: 14,
          fontStyle: "italic",
          color: "#333",
        }}
      >
        {yorum}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  yorumBackground: {
    width: "100%",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginTop: 6,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Yorum = {
  plaka: string;
  yorumcu: string;
  yorum: string;
  onPress: () => void;
};

const Comment = ({ plaka, yorumcu, yorum, onPress }: Yorum) => {
  return (
    <TouchableOpacity style={styles.yorumBackground} onPress={onPress}>
      <Text style={{ fontSize: 18, fontWeight: "500", color: "#FF4C29" }}>
        {plaka}
      </Text>
      <Text
        style={{
          marginTop: 6,
          fontSize: 16,
        }}
      >
        {yorumcu}: {yorum}
      </Text>
    </TouchableOpacity>
  );
};

export default Comment;

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

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
      <View style={styles.commentUpSection}>
        <Text style={styles.commenter}>{yorumcu}</Text>
        <Text style={styles.plateText}>@{plaka.toUpperCase()}</Text>
      </View>

      <Text numberOfLines={4} style={styles.commentText}>
        {yorum}
      </Text>
    </TouchableOpacity>
  );
};

export default Comment;

export const CommentNoTouch = ({ yorum, yorumcu }: YorumNoTouch) => {
  return (
    <View style={styles.yorumBackground}>
      <Text style={styles.commenter}>{yorumcu}</Text>
      <Text style={styles.commentText}>{yorum}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  yorumBackground: {
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,

    elevation: 3,
  },
  commentText: {
    marginTop: 6,
    fontSize: 14,
    color: "#444",
  },
  commenter: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  plateText: {
    color: "#4EE6AA",
    fontWeight: "500",
  },
  commentUpSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

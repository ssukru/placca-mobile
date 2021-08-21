import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Container from "../components/container";
import Input from "../components/input";
import Comment from "../components/comment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../navigation";
import { firestore } from "../utils/firebase";
import { useAuth } from "../context/auth";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParams,
  "AnaSayfaStack"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type MyComment = {
  commentId: string;
  comment: string;
  commenterName: string;
  commenterUid: string;
  plate: string;
  time: string;
  isAnonymous: boolean;
};

const Home = ({ navigation }: Props) => {
  const [plaka, setPlaka] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<Array<MyComment>>([]);

  const auth = useAuth();

  useEffect((): (() => void) => {
    let mounted = true;

    if (mounted && !auth?.authLoading) {
      firestore()
        .collectionGroup("comments")
        .limit(10)
        .orderBy("time", "desc")
        .onSnapshot((result) => {
          if (result.size > 0) {
            let tempComments: Array<MyComment> = [];
            result.forEach((doc) => {
              tempComments.push({
                commentId: doc.id,
                comment: doc.data().comment,
                commenterName: doc.data().commenterName,
                commenterUid: doc.data().commenterUid,
                plate: doc.data().plate,
                time: doc.data().time.toString(),
                isAnonymous: doc.data().isAnonymous,
              });
            });
            setComments(tempComments);
            setLoading(false);
          }
        });
    }

    return () => (mounted = false);
  }, []);

  const Search = () => {
    navigation.navigate("PlakaDetay", {
      plate: plaka.toUpperCase(),
    });
    setPlaka("");
  };

  return (
    <Container>
      <Input
        capitalize
        placeholder="plaka ara"
        value={plaka}
        onChangeText={setPlaka}
        isMultiline={false}
        returnButtonType="send"
        onSubmit={Search}
      />
      <View style={{ width: "100%" }}>
        <Text style={styles.commentCount}>son eklenen yorumlar</Text>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            style={styles.flatList}
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => (
              <Comment
                onPress={() =>
                  navigation.navigate("PlakaDetay", {
                    plate: item.plate,
                  })
                }
                yorum={item.comment}
                yorumcu={item.commenterName}
                plaka={item.plate}
              />
            )}
          />
        )}
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  commentCount: {
    marginTop: 8,
    marginBottom: 4,
    color: "#4EE6AA",
  },
  flatList: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 1,
  },
});

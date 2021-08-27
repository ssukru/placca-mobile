import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Comment, Container, Input } from "../components";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParams } from "../navigation";
import { firestore } from "../utils/firebase";
import { useAuth } from "../context/auth";
import PlateCheck from "../utils/plateCheck";

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
        .limit(20)
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
          } else {
            setLoading(false);
          }
        });
    }

    return () => (mounted = false);
  }, []);

  const Search = () => {
    let plate = plaka;
    const result = PlateCheck(plate);
    if (!result.result) {
      alert(result.error);
      return;
    }
    const trMap: { [key: string]: string } = {
      çÇ: "c",
      ğĞ: "g",
      şŞ: "s",
      üÜ: "u",
      ıİ: "i",
      öÖ: "o",
    };
    for (const key in trMap) {
      plate = plate.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
    }

    navigation.navigate("PlakaDetay", {
      plate: plate.toUpperCase(),
    });
    setPlaka("");
  };

  return (
    <Container paddingHorizontal={14}>
      <Input
        capitalize
        placeholder="plaka ara"
        value={plaka}
        onChangeText={setPlaka}
        isMultiline={false}
        returnButtonType="send"
        onSubmit={Search}
        additionalViewStyle={{ marginLeft: 2, marginRight: 2 }}
      />
      <View style={{ width: "100%" }}>
        <Text style={styles.commentCount}>
          {loading
            ? "yorumlar yükleniyor"
            : comments.length < 1
            ? "hiç yorum bulunamadı, wow."
            : "son eklenen yorumlar"}
        </Text>
        {loading ? (
          <ActivityIndicator />
        ) : comments.length < 1 ? (
          <></>
        ) : (
          <FlatList
            style={styles.flatList}
            data={comments}
            keyExtractor={(item) => item.commentId}
            renderItem={({ item }) => (
              <Comment
                onPress={() =>
                  navigation.navigate("PlakaDetay", {
                    plate: item.plate.toUpperCase(),
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
    marginLeft: 2,
    marginTop: 8,
    marginBottom: 4,
    color: "#4EE6AA",
  },
  flatList: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 2,
  },
});

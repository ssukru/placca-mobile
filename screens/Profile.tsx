import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Comment from "../components/comment";
import { ContainerWithoutSafeArea } from "../components/container";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileStackParams } from "../navigation";
import { useAuth } from "../context/auth";
import { firestore } from "../utils/firebase";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParams,
  "ProfilStack"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
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

const Profile = ({ navigation }: Props) => {
  const auth = useAuth();

  const [comments, setComments] = useState<Array<MyComment>>([]);
  const [commentLoading, setCommentLoading] = useState<boolean>(true);

  useEffect((): (() => void) => {
    let mounted = true;

    if (mounted && !auth?.user?.isAnonymous && !auth?.authLoading) {
      firestore()
        .collectionGroup("comments")
        .limit(10)
        .orderBy("time", "desc")
        .where("commenterUid", "==", auth?.user?.uid)
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
          }
          setCommentLoading(false);
        });
    }

    return () => (mounted = false);
  }, []);

  return (
    <ContainerWithoutSafeArea>
      <View style={styles.mainContainer}>
        {auth?.user?.isAnonymous ? (
          <View style={styles.anonContainer}>
            <Text style={styles.anonDesc}>
              anonim olduğunuz için profil sayfasında görüntülenecek içerik yok.
              dilerseniz hesap oluşturup profil sayfanızı
              kişiselleştirebilirsiniz.
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Kayit");
              }}
            >
              <Text style={styles.registerLink}>kayıt sayfasına git →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.head}>
              <Image
                source={
                  auth?.user?.photoUrl === ""
                    ? require("../assets/pp.png")
                    : {
                        uri: auth?.user?.photoUrl,
                      }
                }
                style={styles.profilePicture}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.text}>{auth?.user?.name}</Text>
                <Text style={{ marginTop: 2 }}>{auth?.user?.city}</Text>
              </View>
            </View>
            <Text style={styles.commentCount}>
              {!commentLoading && comments.length < 1
                ? "Hiç yorum bulunamadı"
                : `${auth?.user?.addedCommentsCount?.toString()} adet yorum bulundu:`}
            </Text>
            {commentLoading ? (
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
          </>
        )}
      </View>
    </ContainerWithoutSafeArea>
  );
};

export default Profile;

const styles = StyleSheet.create({
  head: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  profilePicture: {
    height: 64,
    width: 64,
    marginRight: 12,
    borderRadius: 4,
  },
  flatList: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 1,
  },
  commentCount: {
    marginBottom: 4,
    color: "#159965",
  },
  registerLink: {
    marginVertical: 6,
    fontWeight: "500",
    fontSize: 16,
    color: "#4EE6AA",
  },
  anonDesc: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    color: "#444",
  },
  anonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

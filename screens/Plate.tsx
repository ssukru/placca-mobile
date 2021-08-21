import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CommentNoTouch } from "../components/comment";
import { ContainerWithoutSafeArea } from "../components/container";
import { ProfileStackParams } from "../navigation";
import { firestore } from "../utils/firebase";

type PlakaScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParams,
  "PlakaDetay"
>;

type PlakaScreenRouteProp = RouteProp<ProfileStackParams, "PlakaDetay">;

type Props = {
  navigation: PlakaScreenNavigationProp;
  route: PlakaScreenRouteProp;
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

type Plate = {
  plate: string;
  commentCount: number;
};

const Plate = ({ navigation, route }: Props) => {
  const { plate } = route.params;
  const [comments, setComments] = useState<MyComment[]>([]);
  const [plateDetails, setPlateDetails] = useState<Plate | null>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const plateRef = firestore().collection("plates").doc(plate.toLowerCase());
    plateRef.get().then((plateData) => {
      if (plateData.exists) {
        setPlateDetails({
          commentCount: plateData?.data()?.commentCount,
          plate: plate,
        });
        plateRef
          .collection("comments")
          .limit(10)
          .orderBy("time", "desc")
          .get()
          .then((result) => {
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
      } else {
        setPlateDetails(null);
        setError(
          "aradığınız plakaya ait sonuç bulunamadı. lütfen plakayı doğru girdiğinize emin olunuz."
        );
        setLoading(false);
      }
    });
  }, [plate]);

  return (
    <ContainerWithoutSafeArea>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : error === "" ? (
          <>
            <Text style={styles.plateText}>{plateDetails?.plate}</Text>
            <Text style={styles.commentCount}>
              toplam {plateDetails?.commentCount} yorum bulundu.
            </Text>
            <FlatList
              keyExtractor={(item) => item.commentId}
              style={styles.flatList}
              data={comments}
              renderItem={({ item }) => (
                <CommentNoTouch
                  yorum={item.comment}
                  yorumcu={item.commenterName}
                />
              )}
            />
          </>
        ) : (
          <>
            <Text style={styles.plateText}>{plate}</Text>
            <Text style={styles.errorText}>{error}</Text>
          </>
        )}
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
  flatList: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 1,
  },
  commentCount: {
    marginTop: 8,
    marginBottom: 4,
    color: "#159965",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "300",
  },
});

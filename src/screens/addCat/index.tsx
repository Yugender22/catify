import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  Text,
  Button,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { COLORS } from "../../utils/Colors";
import { getImageHeight } from "../../utils/getImageHeight";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useUploadImage } from "../../data/useUploadImage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Breed } from "../../../api/generated";
import { Error, Loading } from "../../components";
import { Strings } from "../../utils/Strings";
import { TestIds } from "@/src/utils/TestIds";

export const AddCat = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();
  const [breed, setBreed] = useState<Breed>();

  const snapPoints = useMemo(() => ["25%", "25%"], []);

  const uploadImage = useUploadImage();

  const placeholderHeight = image
    ? getImageHeight(image.height / image.width, 32)
    : getImageHeight(800 / 1200, 32);

  const onEditPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const pickImage = async () => {
    try {
      bottomSheetModalRef.current?.dismiss();
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
      });
      processImage(result);
    } catch (err) {
      console.log("err", err);
    }
  };

  const captureImage = async () => {
    bottomSheetModalRef.current?.dismiss();
    const permission = await ImagePicker.getCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsMultipleSelection: false,
      });
      processImage(result);
    } else if (permission.canAskAgain) {
      await ImagePicker.requestCameraPermissionsAsync();
      captureImage();
    } else {
      Alert.alert(Strings.PermissionRequired, Strings.Permission, [
        {
          text: Strings.Ok,
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
    }
  };

  const processImage = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      result.assets.forEach((image) => {
        setImage(image);
      });
    }
  };

  const onBreedSelect = (breed: Breed) => {
    setBreed(breed);
  };

  if (uploadImage.isSuccess) {
    navigation.goBack();
  }

  if (uploadImage.isError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      {uploadImage.isPending && <Loading message="Uploading file" />}
      <View style={styles.formContainer} testID={TestIds.Form}>
        <TouchableOpacity
          testID={TestIds.EditImage}
          style={styles.icon}
          onPress={onEditPress}
        >
          <MaterialCommunityIcons
            name={"pencil"}
            size={22}
            color={COLORS.WHITE}
          />
        </TouchableOpacity>
        <Image
          source={
            image
              ? { uri: image.uri }
              : require("../../../assets/placeholder.png")
          }
          style={{ height: placeholderHeight, width: "100%" }}
        />
        <View style={styles.formSection}>
          <View style={styles.breed}>
            <Text style={styles.title}>{Strings.Breed}:</Text>
            <Text style={styles.value}>{breed ? breed.name : "N/A"}</Text>
          </View>
          <TouchableOpacity
            testID={TestIds.EditBreed}
            style={styles.editIcon}
            onPress={() =>
              navigation.navigate("Breeds", {
                onBreedSelect: onBreedSelect,
              })
            }
          >
            <MaterialCommunityIcons
              name={"pencil"}
              size={22}
              color={COLORS.WHITE}
            />
          </TouchableOpacity>
        </View>
        <Button
          title={Strings.Save}
          disabled={!image}
          color={COLORS.BLUE}
          onPress={async () => {
            if (image) {
              uploadImage.mutateAsync({
                image: image,
                subId: undefined,
                breedIds: breed?.id,
              });
            }
          }}
        />
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetModel}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.bottomSheetContainer}>
              <TouchableOpacity onPress={captureImage}>
                <View style={styles.bottomSheetItem}>
                  <FontAwesome6 color={COLORS.WHITE} name="camera" size={24} />
                  <Text style={styles.option}>Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage}>
                <View style={styles.bottomSheetItem}>
                  <FontAwesome6 color={COLORS.WHITE} name="image" size={24} />
                  <Text style={styles.option}>Gallery</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.WHITE,
  },
  formContainer: {
    gap: 12,
  },
  formSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  breed: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 18,
    backgroundColor: COLORS.BLACK_TRANSPARENT,
  },
  editIcon: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 18,
    backgroundColor: COLORS.BLACK_TRANSPARENT,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomSheetContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "space-around",
  },
  bottomSheetItem: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.WHITE,
    gap: 5,
  },
  bottomSheetModel: {
    backgroundColor: COLORS.BLUE,
  },
  option: {
    fontSize: 15,
    color: COLORS.WHITE,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  value: {
    fontSize: 15,
    fontWeight: "500",
    borderWidth: 1,
    padding: 6,
    width: "70%",
    borderRadius: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

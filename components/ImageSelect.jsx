import React from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function ImageSelect({ imageURL, onChange, onRemove }) {
  async function selectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        console.log(result); // Logging the result to debug
        onChange(result.assets[0].uri); // Accessing the URI of the selected image
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        width: 100,
        height: 100,
        overflow: "hidden",
      }}
    >
      {!imageURL ? (
        <Icon
          name="camera"
          size={100}
          color="black"
          onPress={() => {
            selectImage();
          }}
        />
      ) : (
        <TouchableWithoutFeedback onPress={onRemove}>
          <Image
            source={{ uri: imageURL }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

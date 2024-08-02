import React from "react";
import { View, Text, Alert } from "react-native";
import ImageSelect from "../../components/ImageSelect";
import ImageList from "../../components/ImageList";
import { useState } from "react";
export default function images() {
  const [imageUri, setImageUri] = useState([]);
  function onRemove() {
    console.log("remove");
    // ada a alert to confirm
    Alert.alert("Are you sure you want to remove the image?", "", [
      {
        text: "Yes",
        onPress: () => {
          setImageUri("");
        },
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  }
  onChange = (uri) => {
    setImageUri([...imageUri, uri]);
  };
  onRemove = (index) => {
    console.log(index, "_index");
    setImageUri(imageUri.filter((_, i) => i !== index));
  };
  return (
    <View>
      <ImageList imageUrls={imageUri} onChange={onChange} onRemove={onRemove} />
    </View>
  );
}

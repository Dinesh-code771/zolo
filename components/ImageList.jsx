import React from "react";
import { View } from "react-native";
import ImageSelect from "./ImageSelect";
export default function ImageList({ imageUrls, onChange, onRemove }) {
  console.log(imageUrls, "img");
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
        gap: 10,
      }}
    >
      {imageUrls.map((imageUrl, index) => {
        return (
          <ImageSelect
            key={index}
            imageURL={imageUrl}
            onChange={onChange}
            onRemove={() => onRemove(index)}
          />
        );
      })}
      <ImageSelect onChange={onChange} />
    </View>
  );
}

import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
export default function Post({ item }) {
  const [deleteLoader, setDeleteLoader] = useState(false);

  async function deletePost(id) {
    console.log(id, "id");
    setDeleteLoader(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();
    setDeleteLoader(false);
    console.log(data, "dataa", response);
  }

  return (
    <View style={styles.item}>
      <View style={styles.delete}>
        {!deleteLoader ? (
          <Icon
            onPress={() => {
              deletePost(item.id);
            }}
            name="edit"
            size={20}
            color="blue"
          />
        ) : (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 20,
  },
  body: {
    fontSize: 16,
    color: "#333",
  },
  delete: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});

import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedPost } from "../redux/postsSlice";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
export default function Post({ item, setModalVisible }) {
  const [deleteLoader, setDeleteLoader] = useState(false);
  const dispatch = useDispatch();
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

  function editPost(id, title, body) {
    setModalVisible(true);
    dispatch(setSelectedPost({ id: id, title: title, body: body }));
  }

  return (
    <View style={styles.item}>
      <View style={styles.delete}>
        {!deleteLoader ? (
          <Icon
            onPress={() => {
              deletePost(item.id);
            }}
            name="delete"
            size={20}
            color="red"
          />
        ) : (
          <ActivityIndicator size="small" color="#0000ff" />
        )}
      </View>
      <View style={styles.edit}>
        <Icon
          onPress={() => {
            editPost(item.id, item.title, item.body);
          }}
          name="camera"
          size={20}
          color="black"
        />
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
    marginTop: 10,
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
  edit: {
    position: "absolute",
    right: 40,
    top: 10,
  },
});

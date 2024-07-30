import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import AddPost from "../../components/Addpost";
import Post from "../../components/post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => <Post item={item} />;

  return (
    <View style={styles.container}>
      <Button title="Add Post" onPress={() => setModalVisible(true)} />
      <AddPost visible={modalVisible} onClose={() => setModalVisible(false)} />
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  loading: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 18,
  },
  list: {
    marginTop: 10,
  },
  delete: {
    flex: 1,
    alignItems: "flex-end",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
    marginTop: 5,
    color: "#666",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
export default function AddPost({ visible, onClose }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  console.log(selectedPost, "selectedPost");
  async function handleEditPost() {
    // make fetch put request to update data
    setIsSaving(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body,
          userId: selectedPost.id,
        }),
      }
    );
    const data = await res.json();
    setIsSaving(false);
    console.log(data, "data23");
  }

  const handleSubmit = async () => {
    if (selectedPost.id) {
      return handleEditPost();
    }
    if (!title || !body) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
            userId: 1,
          }),
        }
      );

      const data = await response.json();
      console.log(data, "dataa");
      Alert.alert("Success", "Post added successfully!");
      setTitle("");
      setBody("");
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPost.id) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [selectedPost]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter title"
          />
          <Text style={styles.label}>Body</Text>
          <TextInput
            style={styles.input}
            value={body}
            onChangeText={setBody}
            placeholder="Enter body"
            multiline
          />
          <Button
            title={
              selectedPost.id > 0
                ? isSaving
                  ? "Saving..."
                  : "Save"
                : loading
                ? "Submitting..."
                : "Submit"
            }
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#c3c3c3",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
});

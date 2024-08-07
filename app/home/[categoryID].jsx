import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/productsSlice";
import { useRouter } from "expo-router";
export default function ProductDetails() {
  const { products } = useSelector((state) => state.products);
  const { isEditMode } = useSelector((state) => state.products);
  const [productDetails, setProductDetails] = useState(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const route = useRoute();
  const router = useRouter();
  const { productId } = route.params;

  useEffect(() => {
    const product = products.find(
      (product) => product.id === parseInt(productId)
    );
    console.log(product, "product");
    if (product) {
      setProductDetails(product);
    }
  }, [productId, products]);

  useEffect(() => {
    setTitle(productDetails?.title);
    console.log(productDetails?.price);
    setPrice(productDetails?.price);
    setDescription(productDetails?.description);
  }, [productDetails]);

  if (!productDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Product not found</Text>
      </View>
    );
  }

  function handleSaveChanges() {
    console.log(title, "ds");
    let EditTedProducts = products.map((product) => {
      return product.id === parseInt(productId)
        ? { ...product, title: title, price: price, description: description }
        : product;
    });

    dispatch(setProducts(EditTedProducts));
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: productDetails.image }} />
      {!isEditMode ? (
        <Text style={styles.title}>{productDetails.title}</Text>
      ) : (
        <TextInput
          style={[styles.input, { borderRadius: 5 }]}
          placeholder="Search products..."
          value={title ? title : ""}
          onChangeText={setTitle}
        />
      )}
      {!isEditMode ? (
        <Text style={styles.price}>${productDetails.price}</Text>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      )}
      {!isEditMode ? (
        <Text style={styles.description}>{productDetails.description}</Text>
      ) : (
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={[styles.input, styles.description, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
        />
      )}

      {isEditMode ? (
        <View
          style={{
            width: "100%",
          }}
        >
          <Button onPress={handleSaveChanges} title="Sava changes"></Button>
        </View>
      ) : (
        ""
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: "100%",
  },
  price: {
    fontSize: 20,
    color: "#888",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    resizeMode: "contain",
  },
});

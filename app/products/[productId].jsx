import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { products } from "../dataProducts";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const route = useRoute();
  const { productId } = route.params;

  useEffect(() => {
    const product = products.find(
      (product) => product.id === parseInt(productId)
    );
    console.log(product, "product");
    if (product) {
      setProductDetails(product);
    }
  }, [productId]);

  if (!productDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: productDetails.image }} />
      <Text style={styles.title}>{productDetails.title}</Text>
      <Text style={styles.price}>${productDetails.price}</Text>
      <Text style={styles.description}>{productDetails.description}</Text>
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

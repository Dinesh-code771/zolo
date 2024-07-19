import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useState, useEffect } from "react";
export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  //form data
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  //useEffect to fetch products
  useEffect(() => {
    async function fetchProdcuts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProdcuts();
  }, []);

  // on clicking image
  const handleImagePress = (item) => {
    // router.push(`/products/${item.id}`);
  };
  const handleAddProduct = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleSubmit = () => {
    let newProductDetails = {
      id: products[products.length - 1].id + 1,
      title: title,
      description: description,
      price: price,
    };
    setIsFormOpen(false);
    setProducts([newProductDetails, ...products]);
    setTitle("");
    setDescription("");
    setPrice("");
    console.log(newProductDetails);
  };

  const handleDelte = (productId) => {
    let newProducts = products.filter((product) => {
      return product.id !== productId;
    });

    setProducts(newProducts);
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleImagePress(item)}>
        {item.image ? (
          <Image style={styles.image} source={{ uri: item.image }} />
        ) : (
          <Text>"NO IMAGE"</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 0.5,
          }}
        >
          <Button
            title="Delete Product"
            onPress={() => {
              handleDelte(item.id);
            }}
          />
        </View>

        <View
          style={{
            flex: 0.5,
          }}
        >
          <Button
            title="Delete Product"
            onPress={() => {
              handleDelte(item.id);
            }}
          />
        </View>
      </View>
    </View>
  );
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products</Text>
      <Button
        title={`${isFormOpen ? "Close Form" : "Add Product"}`}
        onPress={handleAddProduct}
      ></Button>
      {isFormOpen && (
        <View style={styles.Formcontainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Button title="Add" onPress={handleSubmit} />
        </View>
      )}

      <View style={styles.listContainer}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  Formcontainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    flex: 0.9,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  price: {
    fontSize: 16,
    color: "#888",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

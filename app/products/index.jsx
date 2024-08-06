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
import RNPickerSelect from "react-native-picker-select";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProducts, setIsEditMode } from "../../redux/productsSlice";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
export default function Product() {
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigation = useNavigation();
  const [selectecCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  //form data
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigation();
  //useEffect to fetch products
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // on clicking image
  const handleImagePress = (item) => {
    console.log("clikced");
    router.push(`/products/${item.id}`);
    dispatch(setIsEditMode(false));
  };

  const handleAddProduct = () => {
    setIsFormOpen(!isFormOpen);
  };

  function handleSort() {
    const sortedArray = [...filteredProducts].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedItems(sortedArray);
  }

  const handleSubmit = () => {
    let newProductDetails = {
      id: products[products.length - 1].id + 1,
      title: title,
      description: description,
      price: price,
      image: imageUri, // Adding the image URI to the new product
    };
    setIsFormOpen(false);
    dispatch(setProducts([newProductDetails, ...products]));
    setTitle("");
    setDescription("");
    setPrice("");
    setImageUri("");
  };

  async function toAskPermission() {
    const result = await ImagePicker.requestCameraPermissionsAsync();
    if (!result.granted) {
      alert("You need to enable permission to access the camera roll.");
    }
  }
  // this run on component mount
  useEffect(() => {
    // toAskPermission();
  }, []);

  function handleEdit(productId) {
    router.push(`/products/${productId}`);
    dispatch(setIsEditMode(true));
  }

  // async function selectImage() {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });
  //     if (!result.canceled) {
  //       console.log(result); // Logging the result to debug
  //       setImageUri(result.assets[0].uri); // Accessing the URI of the selected image
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleDelete = (productId) => {
    let newProducts = products.filter((product) => {
      return product.id !== productId;
    });
    dispatch(setProducts(newProducts));
  };

  //useEffect to handle search products
  useEffect(() => {
    let convertedSearchValue = searchValue.toLowerCase();
    let newSearchedProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(convertedSearchValue);
    });
    setFilteredProducts(newSearchedProducts);

    return () => {
      console.log("un mount");
    };
  }, [searchValue, products]);

  useEffect(() => {
    console.log(selectecCategory, "sd");
  }, [selectecCategory]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => handleImagePress(item)}>
        {item.image ? (
          <Image style={styles.image} source={{ uri: item.image }} />
        ) : (
          <Text>No Image</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Button
            color={"red"}
            title="Delete Product"
            onPress={() => {
              handleDelete(item.id);
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Button
            title="Edit Product"
            onPress={() => {
              handleEdit(item.id);
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
      <Text style={styles.header}>{user.name}</Text>
      <Button
        title={`${isFormOpen ? "Close Form" : "Add Product"}`}
        onPress={handleAddProduct}
      />
      <Button
        title="Go to Images"
        onPress={() => {
          navigation.navigate("products/images");
        }}
      />
      <Button
        title="Post screen"
        onPress={() => {
          navigation.navigate("posts/index");
        }}
      />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      ) : null}
      <TextInput
        style={[styles.input, { marginTop: 30, borderRadius: 5 }]}
        placeholder="Search products..."
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={[
          { label: "Womens", value: "Womens" },
          { label: "Mens", value: "Mens" },
          { label: "clothing", value: "clothing" },
        ]}
      />

      <RNPickerSelect
        onValueChange={(value) => setSelectedCategory(value)}
        items={[
          { label: "High to Low", value: "asc" },
          { label: "Low to High", value: "dec" },
        ]}
      />
      {isFormOpen && (
        <View style={styles.formContainer}>
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
          data={filteredProducts}
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
  formContainer: {
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

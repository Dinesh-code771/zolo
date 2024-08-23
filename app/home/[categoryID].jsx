import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/productsSlice";
import { useRouter, useSearchParams } from "expo-router";
import { products } from "../../data/productsData";
import { useNavigation } from "@react-navigation/native";
import { setSelectedProductData } from "../../redux/productsSlice";
import { setCartItems } from "../../redux/productsSlice";
export default function ProductDetails() {
  // state to store the selected product data
  const allProducts = useSelector((state) => state.products.allProducts);
  const [selectedProductData, setSelectedProductStateData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // to get the selected product from the redux store
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const cartITems = useSelector((state) => state.products.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();
  const navigation = useNavigation();

  // to get the selected product data
  useEffect(() => {
    setSelectedProductStateData(allProducts[selectedProduct]);
  }, [allProducts]);

  useEffect(() => {
    console.log(cartITems, "cart");
  }, [cartITems]);

  useEffect(() => {
    let searchedProducts = allProducts[selectedProduct].filter((product) => {
      if (product.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return product;
      }
    });
    console.log(searchedProducts, "search");

    setSelectedProductStateData(searchedProducts);
  }, [searchValue]);

  // to navigate to the cart screen
  return (
    <View contentContainerStyle={styles.container}>
      {/* delivary container */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 6,
          paddingVertical: 10,
          gap: 5,
          backgroundColor: "#c8f0e5",
        }}
      >
        <Icon name="location-on" size={20} color="black" />
        <Text>Deliver to</Text>
        <Text>India , Hyderabad</Text>
        <Icon name="keyboard-arrow-down" size={20} color="black" />
      </View>

      {/* search container */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: "#c8f0e5",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: "white",
            borderRadius: 5,
          }}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          placeholder="Search"
        ></TextInput>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* banner container */}
      <View
        style={{
          backgroundColor: "#c8f0e5",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 170,
            resizeMode: "cover",
          }}
          source={
            selectedProductData.length > 0 ? selectedProductData[0]?.image : ""
          }
        />
      </View>

      {/* product lists */}
      <ScrollView contentContainerStyle={styles.container}>
        {selectedProductData.length > 0 ? (
          <View style={styles.productListContainer}>
            {selectedProductData.map((product, index) => {
              console.log(product?.image, "product");
              return (
                <View key={index} style={styles.productContainer}>
                  {/* image container */}
                  <View
                    style={{
                      backgroundColor: "#f8f8f8",
                      padding: 10,
                      flex: 0.4,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100, resizeMode: "contain" }}
                      source={product?.image}
                    />
                  </View>
                  {/* product details */}
                  <View
                    style={{ marginLeft: 10, flex: 0.9, width: "100%", gap: 5 }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        paddingRight: 50,
                      }}
                    >
                      {product.name}
                    </Text>
                    <View
                      style={{
                        fontSize: 16,
                        color: "green",
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text> {product.rating}</Text>
                      <Icon name="star" size={20} color="#f7d52d" />
                      <Text style={{ color: "grey", fontSize: 14 }}>
                        {" "}
                        ( {product.ratingCount} )
                      </Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      ₹ {product.price}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        gap: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          borderCurve: 5,
                        }}
                      >
                        <Button
                          title="view"
                          onPress={() => {
                            dispatch(setSelectedProductData(product));
                            // navigate to the product details page
                            navigation.navigate("home/[productID]", {
                              productID: product.name,
                            });
                          }}
                          color="#55AAFF"
                        ></Button>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flex: 1,
                        }}
                      >
                        <Button title="Add to Cart" color="orange"></Button>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <Text> No products found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  productListContainer: {
    padding: 10,
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  productContainer: {
    borderRadius: 10,
    flexDirection: "row",
  },
});

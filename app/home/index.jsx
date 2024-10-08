import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import Swiper from "react-native-swiper";
import { setSelectedProduct } from "../../redux/productsSlice";
import { setAllProducts } from "../../redux/productsSlice";
import { products } from "../../data/productsData";
import { useSelector } from "react-redux";

let staticCategoryData = [
  {
    name: "mobiles",
    image: require(`../../assets/images/mobile.jpeg`),
  },
  {
    name: "Fashion",
    image: require(`../../assets/images/fashion.jpeg`),
  },
  {
    name: "Home",
    image: require(`../../assets/images/home.jpeg`),
  },
  {
    name: "Beauty",
    image: require(`../../assets/images/beauty.jpeg`),
  },
];

export default function Product() {
  const navigation = useNavigation();
  const [searchCategory, setSearchCategory] = React.useState("");
  
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = React.useState([
    {
      name: "mobiles",
      image: require(`../../assets/images/mobile.jpeg`),
    },
    {
      name: "Fashion",
      image: require(`../../assets/images/fashion.jpeg`),
    },
    {
      name: "Home",
      image: require(`../../assets/images/home.jpeg`),
    },
    {
      name: "Beauty",
      image: require(`../../assets/images/beauty.jpeg`),
    },
  ]);

  const selectImage = () => {
    // Your image selection logic here
    navigation.navigate("home/cart");
  };
  const cartITems = useSelector((state) => state.products.cartItems);

  //store my products data inside redux
  useEffect(() => {
    dispatch(setAllProducts(products));
  }, []);

  // to seach the category
  useEffect(() => {
    const searchedCategories = staticCategoryData.filter((category) => {
      if (category.name.toLowerCase().includes(searchCategory.toLowerCase())) {
        return category;
      }
    });
    setCategoryData(searchedCategories);
  }, [searchCategory]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Navbar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={styles.navbar}>
            <TouchableOpacity onPress={selectImage}>
              <Icon
                name="menu"
                size={30}
                color="black"
                style={styles.menuIcon}
              />
            </TouchableOpacity>
            <Image
              style={styles.logo}
              source={require("../../assets/images/amozon.png")}
            />
          </View>
          <TouchableOpacity style={{}} onPress={selectImage}>
            <Text
              style={{
                color: "black",
                fontSize: 16,
              }}
            >
              {cartITems.length ? cartITems.length : 0}
            </Text>
            <Icon
              name="shopping-cart"
              size={30}
              color="black"
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
        {/* search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 6,
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          <Icon name="search" size={20} color="black" />
          <TextInput
            style={{
              width: "80%",
              marginLeft: 10,
            }}
            placeholder="Search"
            value={searchCategory}
            onChangeText={(text) => setSearchCategory(text)}
          ></TextInput>
          <Icon name="mic" size={20} color="black" />
        </View>

        {/* delivary */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 6,
            gap: 5,
            backgroundColor: "#c8f0e5",
          }}
        >
          <Icon name="location-on" size={20} color="black" />
          <Text>Deliver to</Text>
          <Text>India , Hyderabad</Text>
          <Icon name="keyboard-arrow-down" size={20} color="black" />
        </View>
      </View>
      {/* banner container */}
      <View
        style={{
          height: 400,
          width: "100%",
          marginBottom: 10,
        }}
      >
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          loop={true}
        >
          <View
            style={{
              backgroundColor: "#c8f0e5",
              flex: 1,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
              source={require("../../assets/images/banner1.jpeg")}
            />
          </View>
          <View
            style={{
              backgroundColor: "#c8f0e5",
              flex: 1,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
              }}
              source={require("../../assets/images/banner2.jpeg")}
            />
          </View>
        </Swiper>
        {/* swiper 2 */}
        <Swiper
          showsButtons={false}
          autoplay={true}
          style={styles.wrapper}
          loop={true}
        >
          <View
            style={{
              backgroundColor: "#c8f0e5",
              flex: 1,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
              }}
              source={require("../../assets/images/banner3.jpeg")}
            />
          </View>
          <View>
            <Image
              style={{
                width: "100%",
                height: 200,
                resizeMode: "cover",
              }}
              source={require("../../assets/images/banner4.jpeg")}
            />
          </View>
        </Swiper>
      </View>

      {/* category container */}
      <ScrollView
        contentContainerStyle={{
          padding: 10,
        }}
      >
        <View style={styles.categoryContainer}>
          <Text style={styles.headerText}>Recently Viewed Categories</Text>
          <View style={styles.row}>
            {
              // Loop through the category data and display the cards
              categoryData.map((category, index) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setSelectedProduct(category.name));
                    // Navigate to the category page
                    navigation.navigate("home/[categoryID]", {
                      categoryID: category.name,
                    });
                  }}
                >
                  <View style={styles.card} key={index}>
                    <Image style={styles.image} source={category.image} />
                    <Text style={styles.cardText}>{category.name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#95e0d9",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "start",
  },
  menuIcon: {
    marginRight: 10,
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 40, // Adjust height as needed
    resizeMode: "contain",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flexWrap: "wrap",
    flex: 1,
  },
  categoryContainer: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: 60,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
    marginRight: 10,
  },
});

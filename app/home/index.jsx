import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Product() {
  const selectImage = () => {
    // Your image selection logic here
  };

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
          <TouchableOpacity onPress={selectImage}>
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
          backgroundColor: "#c8f0e5",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: 200,
            resizeMode: "cover",
          }}
          source={require("../../assets/images/banner1.jpeg")}
        />
        <Image
          style={{
            width: "100%",
            height: 200,
            resizeMode: "cover",
          }}
          source={require("../../assets/images/banner2.jpeg")}
        />
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
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/mobile.jpeg")}
              />
              <Text style={styles.cardText}>Electronics</Text>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.image}
                source={require("../../assets/images/mobile.jpeg")}
              />
              <Text style={styles.cardText}>Electronics</Text>
            </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor:"#f8f8f8"
  },
  image: {
    width: 60,
    height: 100,
    borderRadius: 10,
    resizeMode: "contain",
    marginRight: 10,
  },
});

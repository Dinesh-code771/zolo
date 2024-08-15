import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function CartPage() {
  // Select the cart items from the Redux store
  const cartItems = useSelector((state) => state.products.cartItems);

  // Render each item in the cart
  const renderItem = ({ item }) => (
    <View style={styles.itemContainerWraper}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
      {/* options bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          gap: 20,
        }}
      >
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#f5f8f7",
              padding: 5,
            }}
            onPress={() => {}}
          >
            <Icon name="delete" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>
            {item.quantity ? item.quantity : 0}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#f5f8f7",
              padding: 5,
            }}
            onPress={() => {}}
          >
            <Icon name="add" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#e7e9eb",
            borderWidth: 1,
          }}
          onPress={() => {}}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#e7e9eb",
            borderWidth: 1,
          }}
          onPress={() => {}}
        >
          <Text>Save For later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.name} // Assuming each item has a unique id
        />
      ) : (
        <Text style={styles.emptyMessage}>Your cart is empty.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    gap: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  itemContainerWraper: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
  },
  image: {
    width: 170,
    height: 170,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e7e9eb",
    borderRadius: 5,
    justifyContent: "space-between",
    marginRight: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
    backgroundColor: "white",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProductID() {
  const selectedProductData = useSelector(
    (state) => state.products.selectedProductData
  );

  return (
    <View style={styles.container}>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={require(`../../assets/images/mobile1.jpeg`)}
        />
      </View>

      {/* Product details container */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{selectedProductData.name}</Text>
        <Text
          style={styles.productPrice}
        >{`${selectedProductData.price} $`}</Text>
        <Text style={styles.productDescription}>
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada."
          }
        </Text>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {/* Quantity container */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity>
              <Icon name="remove" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>1</Text>
            <TouchableOpacity>
              <Icon name="add" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Buy Now button */}
          <TouchableOpacity style={styles.buyNowButton}>
            <Button title="Buy Now" onPress={() => {}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 3,
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "green",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f8f8f8",
    justifyContent: "space-between",
    marginRight: 20,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  buyNowButton: {
    flex: 1,
    borderRadius: 5,
  },
});

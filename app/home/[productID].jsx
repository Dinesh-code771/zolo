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
import { setSelectedProductData } from "../../redux/productsSlice";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { setAllProducts } from "../../redux/productsSlice";
import { products } from "../../data/productsData";
export default function ProductID() {
  const dispatch = useDispatch();
  const selectedProductData = useSelector(
    (state) => state.products.selectedProductData
  );
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const allProducts = useSelector((state) => state.products.allProducts);
  function updateQuantity() {
    console.log(allProducts[selectedProduct], "all");
    const updateDAta = allProducts[selectedProduct].map((product) => {
      if (product.name === selectedProductData.name) {
        console.log(product.quantity ? product.quantity + 1 : 0, "pro");
        return {
          ...product,
          quantity: product.quantity ? product.quantity + 1 : 0,
        };
      } else {
        return product;
      }
    });
    dispatch(
      setAllProducts({
        ...allProducts,
        [selectedProduct]: updateDAta,
      })
    );
  }
  return (
    <View style={styles.container}>
      {/* Image container */}
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} source={selectedProductData.image} />
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
            <Text style={styles.quantityText}>
              {selectedProductData.quantity ? selectedProductData.quantity : 0}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setSelectedProductData({
                    ...selectedProductData,
                    quantity:
                      (selectedProductData.quantity
                        ? selectedProductData.quantity
                        : 0) + 1,
                  })
                );
                updateQuantity();
              }}
            >
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

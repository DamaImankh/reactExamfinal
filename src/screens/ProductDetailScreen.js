import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

const ProductDetailScreen = ({ route, navigation, addToCart, addToFavorites }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} USD</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Кнопка "Добавить в корзину" */}
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Добавить в корзину</Text>
      </TouchableOpacity>

      {/* Кнопка "Добавить в избранное" */}
      <TouchableOpacity
        style={styles.favoritesButton}
        onPress={() => addToFavorites(product)}
      >
        <Text style={styles.buttonText}>Добавить в избранное</Text>
      </TouchableOpacity>

      {/* Кнопка "Назад" */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    color: "green",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  cartButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  favoritesButton: {
    backgroundColor: "#6600ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#bdbebd",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetailScreen;

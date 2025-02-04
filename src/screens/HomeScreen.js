import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

const HomeScreen = ({ navigation, addToCart, addToFavorites, favorites = [] }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // состояние выбранной категории
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Ошибка загрузки данных:", error));

    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <SafeAreaView style={styles.container}>
      {/* Фильтрация и сортировка */}
      <View style={styles.filterSortContainer}>
        {/* Фильтр по категориям */}
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>
            {selectedCategory ? selectedCategory : "Выбрать категорию"}
          </Text>
        </TouchableOpacity>

        {/* Модальное окно выбора категории */}
        <Modal
          visible={isCategoryModalVisible}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelectedCategory(""); // сбрасываем категорию
                  setCategoryModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Все категории</Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCategory(category); // устанавливаем выбранную категорию
                    setCategoryModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Modal>

        {/* Кнопки сортировки */}
        <View style={styles.sortContainer}>
          <TouchableOpacity
            onPress={() =>
              setProducts([...products].sort((a, b) => a.price - b.price))
            }
          >
            <Text style={styles.sortButton}>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setProducts([...products].sort((a, b) => b.price - a.price))
            }
          >
            <Text style={styles.sortButton}>↓</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Список товаров */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price} USD</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.buttonText}>В корзину</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.favoriteButton,
                  favorites?.includes(item.id) && styles.favoriteButtonActive,
                ]}
                onPress={() => addToFavorites(item)}
              >
                <Text style={styles.buttonText}>♡</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() =>
                navigation.navigate("ProductDetail", { productId: item.id })
              }
            >
              <Text style={styles.buttonText}>Подробнее</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  filterSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: "row",
  },
  sortButton: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalItem: {
    padding: 10,
  },
  modalText: {
    fontSize: 18,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: "green",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  favoriteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  detailButton: {
    backgroundColor: "lightgrey",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});

export default HomeScreen;

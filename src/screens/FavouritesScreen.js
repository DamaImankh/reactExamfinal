import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Используем иконки FontAwesome для сердца

const FavouriteScreen = ({ favorites, addToFavorites }) => {

  // Рендеринг каждого товара в избранном
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => addToFavorites(item)} // При клике на сердце добавляем/удаляем товар из избранного
      >
        <FontAwesome
          name={favorites.some(fav => fav.id === item.id) ? 'heart' : 'heart-o'}
          size={30}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Ваши избранные товары пусты.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FavouriteScreen;

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import FavouriteScreen from './src/screens/FavouritesScreen';
import CartScreen from './src/screens/CartScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Добавление или удаление товара из избранного
  const addToFavorites = (product) => {
    setFavorites((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id) // Если товар уже в избранном, то удаляем
        : [...prev, product] // Если товара нет в избранном, то добавляем
    );
    console.log(favorites.some((item) => item.id === product.id) ? "Удалено из избранного" : "Добавлено в избранное", product.title);
  };

  // Добавление товара в корзину
  const addToCart = (product) => {
    setCart((prev) => {
      const existingProduct = prev.find(item => item.id === product.id);
      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    console.log("Добавлено в корзину:", product.title);
  };

  const StackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        options={{ headerShown: false }} // Убираем шапку на экране Home
      >
        {(props) => (
          <HomeScreen {...props} addToCart={addToCart} addToFavorites={addToFavorites} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ProductDetail">
        {(props) => <ProductDetailScreen {...props} addToCart={addToCart} addToFavorites={addToFavorites} />}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Главная" component={StackNavigator} />
        <Tab.Screen name="Избранное">
          {() => <FavouriteScreen favorites={favorites} addToFavorites={addToFavorites} />}
        </Tab.Screen>
        <Tab.Screen name="Корзина">
          {() => <CartScreen cart={cart} setCart={setCart} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

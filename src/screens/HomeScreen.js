import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser, selectIsAuthenticated} from '../redux/slices/authSlice';
import {selectTheme} from '../redux/slices/themeSlice';
import {showSnackbar} from '../redux/slices/snackbarSlice';
import {productsAPI} from '../services/api';
import {wp, hp} from '../utils/dimensions';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const theme = useSelector(selectTheme);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts(10, 0);
      setProducts(response.products);
      dispatch(showSnackbar({message: 'Products loaded successfully', type: 'success'}));
    } catch (error) {
      console.error('Error fetching products:', error);
      dispatch(showSnackbar({message: 'Failed to load products', type: 'error'}));
    } finally {
      setLoading(false);
    }
  };

  // Refresh products
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await productsAPI.getProducts(10, 0);
      setProducts(response.products);
      dispatch(showSnackbar({message: 'Products refreshed', type: 'success'}));
    } catch (error) {
      dispatch(showSnackbar({message: 'Failed to refresh products', type: 'error'}));
    }
    setRefreshing(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Render product item
  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={[styles.productCard, {backgroundColor: theme.colors.card}]}
      onPress={() => navigation.navigate('Detail', {productId: item.id})}>
      <Image source={{uri: item.thumbnail}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, {color: theme.colors.text}]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.productPrice, {color: theme.colors.primary}]}>${item.price}</Text>
        <Text style={[styles.productRating, {color: theme.colors.textSecondary}]}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centerContainer, {backgroundColor: theme.colors.background}]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.header, {backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border}]}>
        <Text style={[styles.greeting, {color: theme.colors.text}]}>
          {isAuthenticated && user
            ? `Hello, ${user.firstName}!`
            : 'Welcome, Guest!'}
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>Featured Products</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: wp(5),
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 10,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  productRating: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;

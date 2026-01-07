import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../redux/slices/themeSlice';
import {showSnackbar} from '../redux/slices/snackbarSlice';
import {productsAPI} from '../services/api';
import {wp, hp} from '../utils/dimensions';

const ListingScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProducts(30, 0);
      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async query => {
    if (!query.trim()) {
      fetchProducts();
      return;
    }

    try {
      setIsSearching(true);
      const response = await productsAPI.searchProducts(query);
      setProducts(response.products);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Debounce search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Render product item
  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={[styles.productItem, {backgroundColor: theme.colors.card}]}
      onPress={() => navigation.navigate('Detail', {productId: item.id})}>
      <Image source={{uri: item.thumbnail}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={[styles.productTitle, {color: theme.colors.text}]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.productBrand, {color: theme.colors.textSecondary}]}>{item.brand || 'No Brand'}</Text>
        <View style={styles.priceRow}>
          <Text style={[styles.productPrice, {color: theme.colors.primary}]}>${item.price}</Text>
          <Text style={[styles.productRating, {color: theme.colors.textSecondary}]}>⭐ {item.rating}</Text>
        </View>
        <Text style={[styles.productStock, {color: theme.colors.textSecondary}]}>
          {item.stock > 0 ? `In Stock: ${item.stock}` : 'Out of Stock'}
        </Text>
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
      <View style={[styles.searchContainer, {backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border}]}>
        <TextInput
          style={[styles.searchInput, {backgroundColor: theme.colors.background, color: theme.colors.text}]}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {isSearching && (
          <ActivityIndicator
            size="small"
            color={theme.colors.primary}
            style={styles.searchLoader}
          />
        )}
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, {color: theme.colors.textSecondary}]}>No products found</Text>
          </View>
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
  searchContainer: {
    padding: wp(4),
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  searchLoader: {
    position: 'absolute',
    right: 25,
  },
  list: {
    padding: 10,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  productRating: {
    fontSize: 14,
    color: '#666',
  },
  productStock: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ListingScreen;

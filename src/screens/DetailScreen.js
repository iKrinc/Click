import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../redux/slices/themeSlice';
import {showSnackbar} from '../redux/slices/snackbarSlice';
import {productsAPI} from '../services/api';
import {wp, hp} from '../utils/dimensions';

const DetailScreen = ({route}) => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const {productId} = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProductById(productId);
      setProduct(response);
      dispatch(showSnackbar({message: 'Product details loaded', type: 'success'}));
    } catch (error) {
      console.error('Error fetching product details:', error);
      dispatch(showSnackbar({message: 'Failed to load product details', type: 'error'}));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <View style={[styles.centerContainer, {backgroundColor: theme.colors.background}]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.centerContainer, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.errorText, {color: theme.colors.error}]}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Image source={{uri: product.thumbnail}} style={styles.mainImage} />

      <View style={styles.content}>
        <Text style={[styles.brand, {color: theme.colors.textSecondary}]}>{product.brand || 'No Brand'}</Text>
        <Text style={[styles.title, {color: theme.colors.text}]}>{product.title}</Text>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, {color: theme.colors.primary}]}>${product.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.rating, {color: theme.colors.text}]}>⭐ {product.rating}</Text>
            <Text style={[styles.reviews, {color: theme.colors.textSecondary}]}>({product.reviews?.length || 0} reviews)</Text>
          </View>
        </View>

        {product.discountPercentage > 0 && (
          <View style={[styles.discountBadge, {backgroundColor: theme.colors.error}]}>
            <Text style={styles.discountText}>
              {product.discountPercentage}% OFF
            </Text>
          </View>
        )}

        <View style={[styles.section, {backgroundColor: theme.colors.card}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Description</Text>
          <Text style={[styles.description, {color: theme.colors.textSecondary}]}>{product.description}</Text>
        </View>

        <View style={[styles.section, {backgroundColor: theme.colors.card}]}>
          <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Product Details</Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.colors.textSecondary}]}>Category:</Text>
            <Text style={[styles.detailValue, {color: theme.colors.text}]}>{product.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.colors.textSecondary}]}>Stock:</Text>
            <Text
              style={[
                styles.detailValue,
                {color: product.stock > 0 ? theme.colors.success : theme.colors.error},
              ]}>
              {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.colors.textSecondary}]}>SKU:</Text>
            <Text style={[styles.detailValue, {color: theme.colors.text}]}>{product.sku}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.colors.textSecondary}]}>Weight:</Text>
            <Text style={[styles.detailValue, {color: theme.colors.text}]}>{product.weight}g</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.colors.textSecondary}]}>Warranty:</Text>
            <Text style={[styles.detailValue, {color: theme.colors.text}]}>{product.warrantyInformation}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, {color: theme.colors.textSecondary}]}>Shipping:</Text>
            <Text style={[styles.detailValue, {color: theme.colors.text}]}>{product.shippingInformation}</Text>
          </View>
        </View>

        {product.tags && product.tags.length > 0 && (
          <View style={[styles.section, {backgroundColor: theme.colors.card}]}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Tags</Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag, index) => (
                <View key={index} style={[styles.tag, {backgroundColor: theme.colors.background}]}>
                  <Text style={[styles.tagText, {color: theme.colors.textSecondary}]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
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
  mainImage: {
    width: wp(100),
    height: wp(100),
    resizeMode: 'cover',
  },
  content: {
    padding: wp(5),
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  discountBadge: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  inStock: {
    color: '#34c759',
    fontWeight: '600',
  },
  outOfStock: {
    color: '#ff3b30',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DetailScreen;

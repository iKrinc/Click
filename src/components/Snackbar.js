import React, {useEffect} from 'react';
import {StyleSheet, Text, Animated, Dimensions} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectSnackbar, hideSnackbar} from '../redux/slices/snackbarSlice';
import {selectTheme} from '../redux/slices/themeSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const Snackbar = () => {
  const dispatch = useDispatch();
  const {visible, message, type} = useSelector(selectSnackbar);
  const theme = useSelector(selectTheme);
  const insets = useSafeAreaInsets();
  const translateY = React.useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(3000),
        Animated.timing(translateY, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        dispatch(hideSnackbar());
      });
    }
  }, [visible, translateY, dispatch]);

  if (!visible && translateY._value === 100) {
    return null;
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.text;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          bottom: insets.bottom + 20,
          transform: [{translateY}],
        },
      ]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 9999,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Snackbar;

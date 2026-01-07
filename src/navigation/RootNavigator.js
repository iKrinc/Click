import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated, selectIsSkipped} from '../redux/slices/authSlice';
import {selectTheme} from '../redux/slices/themeSlice';
import AuthScreen from '../screens/AuthScreen';
import DetailScreen from '../screens/DetailScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSkipped = useSelector(selectIsSkipped);
  const theme = useSelector(selectTheme);

  // User can access main app if authenticated OR skipped
  const canAccessApp = isAuthenticated || isSkipped;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: theme.colors.text,
        },
        headerTintColor: theme.colors.primary,
      }}>
      {!canAccessApp ? (
        // Auth flow - show only auth screen
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{headerShown: false}}
        />
      ) : (
        // Main app flow - show tabs and detail screen
        <>
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{
              title: 'Product Details',
              headerBackTitle: 'Back',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

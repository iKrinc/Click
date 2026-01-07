import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Switch,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  logout,
  selectUser,
  selectIsAuthenticated,
  selectIsSkipped,
} from '../redux/slices/authSlice';
import {toggleTheme, selectTheme, selectIsDarkMode} from '../redux/slices/themeSlice';
import {useNavigation} from '@react-navigation/native';
import {wp, hp} from '../utils/dimensions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isSkipped = useSelector(selectIsSkipped);
  const theme = useSelector(selectTheme);
  const isDarkMode = useSelector(selectIsDarkMode);

  // Handle theme toggle
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Handle logout
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  // Handle login navigation (when user skipped)
  const handleLogin = () => {
    dispatch(logout()); // This will reset state and redirect to auth
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.background}]}>
      {isAuthenticated && user ? (
        // Authenticated user view
        <View style={styles.content}>
          <View style={[styles.profileHeader, {backgroundColor: theme.colors.card}]}>
            <Image source={{uri: user.image}} style={styles.avatar} />
            <Text style={[styles.name, {color: theme.colors.text}]}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={[styles.username, {color: theme.colors.primary}]}>@{user.username}</Text>
            <Text style={[styles.email, {color: theme.colors.textSecondary}]}>{user.email}</Text>
          </View>

          <View style={[styles.section, {backgroundColor: theme.colors.card}]}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Personal Information</Text>
            <View style={[styles.infoRow, {borderBottomColor: theme.colors.border}]}>
              <Text style={[styles.infoLabel, {color: theme.colors.textSecondary}]}>First Name:</Text>
              <Text style={[styles.infoValue, {color: theme.colors.text}]}>{user.firstName}</Text>
            </View>
            <View style={[styles.infoRow, {borderBottomColor: theme.colors.border}]}>
              <Text style={[styles.infoLabel, {color: theme.colors.textSecondary}]}>Last Name:</Text>
              <Text style={[styles.infoValue, {color: theme.colors.text}]}>{user.lastName}</Text>
            </View>
            <View style={[styles.infoRow, {borderBottomColor: theme.colors.border}]}>
              <Text style={[styles.infoLabel, {color: theme.colors.textSecondary}]}>Gender:</Text>
              <Text style={[styles.infoValue, {color: theme.colors.text}]}>
                {user.gender || 'Not specified'}
              </Text>
            </View>
          </View>

          <View style={[styles.section, {backgroundColor: theme.colors.card}]}>
            <View style={styles.themeRow}>
              <View>
                <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Dark Mode</Text>
                <Text style={[styles.themeSubtitle, {color: theme.colors.textSecondary}]}>
                  {isDarkMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={handleThemeToggle}
                trackColor={{false: theme.colors.border, true: theme.colors.primary}}
                thumbColor={isDarkMode ? theme.colors.card : '#f4f3f4'}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.logoutButton, {backgroundColor: theme.colors.error}]} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Guest/Skipped user view
        <View style={styles.content}>
          <View style={styles.guestContainer}>
            <View style={[styles.guestIcon, {backgroundColor: theme.colors.border}]}>
              <Text style={styles.guestIconText}>👤</Text>
            </View>
            <Text style={[styles.guestTitle, {color: theme.colors.text}]}>Welcome, Guest!</Text>
            <Text style={[styles.guestSubtitle, {color: theme.colors.textSecondary}]}>
              Login to access personalized features and your profile
            </Text>

            <TouchableOpacity style={[styles.loginButton, {backgroundColor: theme.colors.primary}]} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={[styles.section, {backgroundColor: theme.colors.card, width: '100%'}]}>
              <View style={styles.themeRow}>
                <View>
                  <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Dark Mode</Text>
                  <Text style={[styles.themeSubtitle, {color: theme.colors.textSecondary}]}>
                    {isDarkMode ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
                <Switch
                  value={isDarkMode}
                  onValueChange={handleThemeToggle}
                  trackColor={{false: theme.colors.border, true: theme.colors.primary}}
                  thumbColor={isDarkMode ? theme.colors.card : '#f4f3f4'}
                />
              </View>
            </View>

            <View style={[styles.infoBox, {backgroundColor: theme.colors.card}]}>
              <Text style={[styles.infoBoxTitle, {color: theme.colors.text}]}>Why Login?</Text>
              <Text style={[styles.infoBoxText, {color: theme.colors.textSecondary}]}>
                • Access your personalized profile
              </Text>
              <Text style={[styles.infoBoxText, {color: theme.colors.textSecondary}]}>• Save your preferences</Text>
              <Text style={[styles.infoBoxText, {color: theme.colors.textSecondary}]}>
                • Get personalized recommendations
              </Text>
              <Text style={[styles.infoBoxText, {color: theme.colors.textSecondary}]}>• Track your activities</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: wp(5),
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: '#e0e0e0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  guestContainer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  guestIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestIconText: {
    fontSize: 50,
  },
  guestTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoBoxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoBoxText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
});

export default ProfileScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, skipLogin, selectAuthLoading, selectAuthError, clearError} from '../redux/slices/authSlice';
import {selectTheme} from '../redux/slices/themeSlice';
import {wp, hp} from '../utils/dimensions';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const theme = useSelector(selectTheme);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle login
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    try {
      await dispatch(loginUser({username, password})).unwrap();
    } catch (err) {
      Alert.alert('Login Failed', err || 'Invalid credentials');
    }
  };

  // Handle skip login
  const handleSkip = () => {
    dispatch(skipLogin());
  };

  // Clear error when user starts typing
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={[styles.title, {color: theme.colors.text}]}>Welcome</Text>
          <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>Sign in to continue</Text>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, {backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text}]}
              placeholder="Username"
              placeholderTextColor={theme.colors.textSecondary}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            <TextInput
              style={[styles.input, {backgroundColor: theme.colors.card, borderColor: theme.colors.border, color: theme.colors.text}]}
              placeholder="Password"
              placeholderTextColor={theme.colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />

            {error && <Text style={[styles.errorText, {color: theme.colors.error}]}>{error}</Text>}

            <TouchableOpacity
              style={[styles.button, styles.loginButton, {backgroundColor: theme.colors.primary}]}
              onPress={handleLogin}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.skipButton, {borderColor: theme.colors.primary}]}
              onPress={handleSkip}
              disabled={loading}>
              <Text style={[styles.skipButtonText, {color: theme.colors.primary}]}>Skip for now</Text>
            </TouchableOpacity>

            <View style={[styles.infoContainer, {backgroundColor: theme.colors.card}]}>
              <Text style={[styles.infoText, {color: theme.colors.textSecondary}]}>Demo Credentials:</Text>
              <Text style={[styles.infoText, {color: theme.colors.textSecondary}]}>Username: emilys</Text>
              <Text style={[styles.infoText, {color: theme.colors.textSecondary}]}>Password: emilyspass</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: wp(5),
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#007AFF',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f4f8',
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default AuthScreen;

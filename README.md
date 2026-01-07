# React Native Boilerplate - Click

A clean, efficient, and well-documented React Native boilerplate with authentication, navigation, and state management. This is a bare React Native project (no Expo) with production-ready architecture.

## 📋 Features

- ✅ **Authentication Flow**: Login, skip, and logout functionality
- ✅ **Protected Routes**: Navigation guards based on authentication state
- ✅ **Redux Toolkit**: State management with Redux Persist
- ✅ **React Navigation**: Bottom tabs and stack navigation
- ✅ **API Integration**: DummyJSON API for demo data
- ✅ **4 Main Screens**: Home, Listing, Detail, and Profile
- ✅ **TypeScript Support**: Type-safe development
- ✅ **Clean Architecture**: Organized folder structure

## 🛠️ Tech Stack

- **React Native**: 0.83.1
- **React Navigation**: Native stack and bottom tabs
- **Redux Toolkit**: State management with async thunks
- **Redux Persist**: Persistent state storage
- **Axios**: HTTP client for API requests
- **AsyncStorage**: Local data persistence

## 📦 Environment Versions

This project is tested and working with the following versions:

```
Node.js:   v22.14.0
npm:       10.9.2
Yarn:      1.22.22
Java JDK:  18.0.2.1
React Native: 0.83.1
```

## 📁 Project Structure

```
click-mobile-app/
├── src/
│   ├── navigation/          # Navigation configuration
│   │   ├── RootNavigator.js    # Main navigation with auth guards
│   │   └── TabNavigator.js     # Bottom tab navigation
│   ├── redux/              # State management
│   │   ├── slices/
│   │   │   └── authSlice.js    # Authentication state
│   │   └── store/
│   │       └── index.js        # Redux store with persist
│   ├── screens/            # App screens
│   │   ├── AuthScreen.js       # Login/Skip screen
│   │   ├── HomeScreen.js       # Home with featured products
│   │   ├── ListingScreen.js    # Product listing with search
│   │   ├── DetailScreen.js     # Product details
│   │   └── ProfileScreen.js    # User profile with logout
│   ├── services/           # API services
│   │   └── api.js              # DummyJSON API integration
│   └── constants/          # App constants
├── android/                # Android native code
├── ios/                    # iOS native code
├── App.tsx                 # App entry point
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v22.14.0 or compatible)
2. **npm** (10.9.2) or **Yarn** (1.22.22)
3. **Java JDK** (18.0.2.1)
4. **Android Studio** (for Android development)
5. **Xcode** (for iOS development, macOS only)
6. **React Native CLI**

### Installation

1. **Clone the repository**
   ```bash
   cd click-mobile-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

## 📱 Running the App

### Android

1. **Start Metro bundler**
   ```bash
   yarn start
   ```

2. **Run on Android** (in a new terminal)
   ```bash
   yarn android
   ```

   **Requirements for Android:**
   - Android Studio installed
   - Android SDK installed (API Level 34 recommended)
   - Android emulator running OR physical device connected
   - USB debugging enabled (for physical devices)
   - Java JDK 18.0.2.1 configured

### iOS (macOS only)

1. **Start Metro bundler**
   ```bash
   yarn start
   ```

2. **Run on iOS** (in a new terminal)
   ```bash
   yarn ios
   ```

   **Requirements for iOS:**
   - macOS operating system
   - Xcode installed (latest version recommended)
   - iOS Simulator OR physical device connected
   - CocoaPods installed

### Troubleshooting

**Metro bundler issues:**
```bash
# Clear Metro cache
yarn start --reset-cache
```

**Android build issues:**
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
```

**iOS build issues:**
```bash
# Clean iOS build
cd ios && pod deintegrate && pod install && cd ..
```

## 🔐 Authentication

The app uses DummyJSON API for authentication.

### Demo Credentials

```
Username: emilys
Password: emilyspass
```

### Auth Flow

1. **Login**: User enters credentials → API validates → Token stored in Redux → Navigate to main app
2. **Skip**: User skips login → Guest mode enabled → Navigate to main app with limited features
3. **Logout**: User logs out → Clear Redux state → Navigate back to auth screen

### Protected Routes

- Authentication screen is shown when user is NOT authenticated AND has NOT skipped
- Main app (tabs) is accessible if user is authenticated OR has skipped
- Profile screen shows login button if user skipped, logout button if authenticated

## 📡 API Integration

This boilerplate uses [DummyJSON](https://dummyjson.com/) for demo data.

### Available Endpoints

**Authentication:**
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

**Products:**
- `GET /products` - Get all products (with pagination)
- `GET /products/:id` - Get single product
- `GET /products/search?q=query` - Search products
- `GET /products/categories` - Get categories
- `GET /products/category/:category` - Get products by category

**Users:**
- `GET /users` - Get all users
- `GET /users/:id` - Get single user

### API Service Structure

Located in `src/services/api.js`:
- Axios instance with base configuration
- Request/response interceptors
- Error handling
- Organized by domain (auth, products, users)

## 🗂️ State Management

Redux Toolkit with Redux Persist for state management.

### Auth State

Located in `src/redux/slices/authSlice.js`:

```javascript
{
  user: null,           // User object
  token: null,          // JWT token
  isAuthenticated: false, // Auth status
  isSkipped: false,     // Skip status
  loading: false,       // Loading state
  error: null          // Error message
}
```

### Actions

- `loginUser` - Async thunk for login
- `skipLogin` - Skip authentication
- `logout` - Clear auth state
- `clearError` - Clear error message

### Selectors

- `selectAuth` - Get entire auth state
- `selectIsAuthenticated` - Get auth status
- `selectIsSkipped` - Get skip status
- `selectUser` - Get user object
- `selectToken` - Get JWT token

## 🎨 Screens

### 1. Auth Screen (`AuthScreen.js`)
- Login form with username/password
- Skip button for guest access
- Demo credentials display
- Loading states and error handling

### 2. Home Screen (`HomeScreen.js`)
- Featured products grid
- Personalized greeting
- Pull-to-refresh
- Navigate to product details

### 3. Listing Screen (`ListingScreen.js`)
- All products list
- Search functionality
- Debounced search
- Navigate to product details

### 4. Detail Screen (`DetailScreen.js`)
- Product details view
- Images, price, rating
- Description and specifications
- Tags and stock information

### 5. Profile Screen (`ProfileScreen.js`)
- User profile (when authenticated)
- Guest view (when skipped)
- Logout button (when authenticated)
- Login button (when skipped)

## 🧪 Testing

```bash
# Run tests
yarn test
```

## 🐛 Common Issues

### Issue: Metro bundler won't start
**Solution:**
```bash
yarn start --reset-cache
```

### Issue: Android app won't build
**Solution:**
1. Check Java version: `java -version` (should be 18.0.2.1)
2. Clean build: `cd android && ./gradlew clean && cd ..`
3. Rebuild: `yarn android`

### Issue: iOS app won't build
**Solution:**
1. Clean pods: `cd ios && pod deintegrate && pod install && cd ..`
2. Clean build folder in Xcode
3. Rebuild: `yarn ios`

### Issue: Module not found errors
**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

## 🐳 Docker Support (Coming Soon)

Docker containerization will be added in future versions to eliminate version-related issues and provide consistent development environment across all platforms.

## 📝 Best Practices

1. **Code Organization**: Keep related files together in feature folders
2. **State Management**: Use Redux for global state, local state for component-specific data
3. **API Calls**: Always handle loading and error states
4. **Navigation**: Use proper navigation types for type safety
5. **Styling**: Use StyleSheet for performance
6. **Error Handling**: Always wrap API calls in try-catch blocks

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [DummyJSON](https://dummyjson.com/)

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review the troubleshooting section

---

**Happy Coding!** 🚀

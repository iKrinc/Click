# Quick Start Guide - Click Mobile App

Get up and running with the Click React Native boilerplate in minutes!

## Prerequisites Checklist

Before you start, make sure you have:

- [ ] Node.js v22.14.0 installed
- [ ] npm 10.9.2 (or Yarn 1.22.22)
- [ ] Java JDK 18.0.2.1 installed
- [ ] Android Studio installed (for Android)
- [ ] Xcode installed (for iOS, macOS only)

Not sure? Check your versions:
```bash
node --version && npm --version && java -version
```

## 🚀 5-Minute Setup

### 1. Install Dependencies

```bash
cd click-mobile-app
yarn install
```

### 2. Install iOS Pods (macOS only)

```bash
cd ios && pod install && cd ..
```

### 3. Start Metro Bundler

```bash
yarn start
```

### 4. Run the App

**Android** (in a new terminal):
```bash
yarn android
```

**iOS** (in a new terminal, macOS only):
```bash
yarn ios
```

## 🎯 First Run

When the app launches, you'll see the **Login Screen**.

### Test the App

1. **Option 1: Login**
   - Username: `emilys`
   - Password: `emilyspass`
   - Tap "Login"

2. **Option 2: Skip**
   - Tap "Skip for now"
   - Explore as a guest

### Navigate the App

After login/skip, you'll see 3 tabs:

- **🏠 Home**: Featured products
- **📋 Listing**: Browse and search all products
- **👤 Profile**: User profile (or login prompt if skipped)

Try this:
1. Tap any product card → See details
2. Use search in Listing tab
3. Pull to refresh on Home screen
4. Logout from Profile (if logged in)

## 📁 Project Structure

```
click-mobile-app/
├── src/
│   ├── screens/         # All app screens
│   ├── navigation/      # Navigation setup
│   ├── redux/          # State management
│   └── services/       # API calls
├── android/            # Android native
├── ios/               # iOS native
└── App.tsx            # Entry point
```

## 🔑 Important Files

| File | Purpose |
|------|---------|
| `App.tsx` | App entry with Redux and Navigation |
| `src/navigation/RootNavigator.js` | Route protection logic |
| `src/redux/slices/authSlice.js` | Authentication state |
| `src/services/api.js` | All API endpoints |

## 🛠️ Common Commands

```bash
# Start development
yarn start

# Run on Android
yarn android

# Run on iOS
yarn ios

# Clear cache
yarn start --reset-cache

# Run tests
yarn test

# Lint code
yarn lint
```

## 🐛 Troubleshooting Quick Fixes

### Metro bundler won't start?
```bash
yarn start --reset-cache
```

### Build fails?
```bash
# Android
cd android && ./gradlew clean && cd ..
yarn android

# iOS
cd ios && pod install && cd ..
yarn ios
```

### Module not found?
```bash
rm -rf node_modules
yarn install
```

## 📱 Testing on Physical Device

### Android
1. Enable Developer Options on device
2. Enable USB Debugging
3. Connect via USB
4. Run `npm run android`

### iOS
1. Open `ios/Click.xcworkspace` in Xcode
2. Select your device
3. Click Run (or `cmd + R`)

## 🔐 Demo Accounts

| Username | Password |
|----------|----------|
| emilys | emilyspass |
| michaelw | michaelwpass |
| sophiab | sophiabpass |

## 📚 Next Steps

1. ✅ App running? Great! Now explore:
   - [ ] Read [README.md](README.md) for full overview
   - [ ] Check [API_DOCS.md](API_DOCS.md) for API details
   - [ ] Review [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
   - [ ] See [VERSION_INFO.md](VERSION_INFO.md) for version details

2. ✅ Start developing:
   - [ ] Create a new screen in `src/screens/`
   - [ ] Add a new Redux slice in `src/redux/slices/`
   - [ ] Add new API endpoints in `src/services/api.js`

## 🎨 Customization Quick Tips

### Change App Name
Edit these files:
- `app.json` - Change `name` and `displayName`
- `android/app/src/main/res/values/strings.xml` - Android name
- `ios/Click/Info.plist` - iOS display name

### Change Colors
Update colors in screen files:
- Primary: `#007AFF` (iOS blue)
- Error: `#ff3b30`
- Success: `#34c759`

### Add New Screen
1. Create screen file in `src/screens/`
2. Add to navigation in `src/navigation/`
3. (Optional) Create Redux slice if needed

## 💡 Pro Tips

1. **Use React Native Debugger**
   ```bash
   # Install
   brew install react-native-debugger  # macOS
   ```

2. **Hot Reload Not Working?**
   - Shake device (physical) or press `Cmd+D` (iOS) / `Cmd+M` (Android)
   - Enable "Fast Refresh"

3. **Performance Issues?**
   - Use `useMemo` and `useCallback` for expensive operations
   - Enable Hermes (already enabled in this project)

4. **Debugging API Calls**
   - Check `src/services/api.js` interceptors
   - Console logs are visible in Metro terminal

## 🆘 Need Help?

- **Setup issues?** → See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **API questions?** → See [API_DOCS.md](API_DOCS.md)
- **Version conflicts?** → See [VERSION_INFO.md](VERSION_INFO.md)
- **General issues?** → See [README.md](README.md) troubleshooting

## 📞 Resources

- React Native Docs: https://reactnative.dev/
- React Navigation: https://reactnavigation.org/
- Redux Toolkit: https://redux-toolkit.js.org/
- DummyJSON API: https://dummyjson.com/

---

**Ready to build?** Start coding in `src/` and watch the magic happen! ✨

**Questions?** All documentation is in the root folder. Happy coding! 🚀

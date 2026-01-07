# Version Information - Click Mobile App

This document contains all version information for the Click React Native boilerplate project.

## Environment Versions

### Node.js
- **Version**: v22.14.0
- **Requirement**: Node.js >= 20
- **Download**: https://nodejs.org/

### Package Managers
- **npm Version**: 10.9.2
- **Yarn Version**: 1.22.22 (optional alternative to npm)

### Java Development Kit
- **Version**: 18.0.2.1
- **Type**: Oracle JDK / OpenJDK
- **Requirement**: JDK 17 or 18 required for React Native 0.83+
- **Download**: https://www.oracle.com/java/technologies/downloads/

## React Native & Dependencies

### Core Framework
- **React Native**: 0.83.1
- **React**: 19.2.0
- **React Native CLI**: @react-native-community/cli 20.0.0

### Navigation
- **@react-navigation/native**: ^7.1.26
- **@react-navigation/native-stack**: ^7.9.0
- **@react-navigation/bottom-tabs**: ^7.9.0
- **react-native-screens**: ^4.19.0
- **react-native-safe-area-context**: ^5.6.2

### State Management
- **@reduxjs/toolkit**: ^2.11.2
- **react-redux**: ^9.2.0
- **redux-persist**: ^6.0.0
- **@react-native-async-storage/async-storage**: ^2.2.0

### API & Networking
- **axios**: ^1.13.2

## Development Tools

### Build Tools
- **@babel/core**: ^7.25.2
- **@babel/preset-env**: ^7.25.3
- **@babel/runtime**: ^7.25.0
- **@react-native/babel-preset**: 0.83.1
- **@react-native/metro-config**: 0.83.1

### TypeScript
- **typescript**: ^5.8.3
- **@react-native/typescript-config**: 0.83.1
- **@types/react**: ^19.2.0
- **@types/jest**: ^29.5.13

### Code Quality
- **eslint**: ^8.19.0
- **@react-native/eslint-config**: 0.83.1
- **prettier**: 2.8.8

### Testing
- **jest**: ^29.6.3
- **react-test-renderer**: 19.2.0
- **@types/react-test-renderer**: ^19.1.0

## Platform-Specific Versions

### Android
- **Minimum SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14.0)
- **Compile SDK**: 34
- **Build Tools**: 34.0.0
- **Gradle**: 8.10.2 (via wrapper)
- **Android Gradle Plugin**: 8.6.1
- **Kotlin**: 1.9.22

### iOS
- **Minimum iOS Version**: 13.4
- **Target iOS Version**: Latest
- **Xcode**: 14.0 or newer recommended
- **CocoaPods**: 1.11.0 or newer

## Version Compatibility Matrix

| Tool | Minimum | Recommended | Tested With |
|------|---------|-------------|-------------|
| Node.js | 20.0.0 | 22.14.0 | 22.14.0 |
| npm | 9.0.0 | 10.9.2 | 10.9.2 |
| Java JDK | 17.0.0 | 18.0.2.1 | 18.0.2.1 |
| React Native | 0.83.1 | 0.83.1 | 0.83.1 |
| Android Studio | Giraffe | Latest | Latest |
| Xcode | 14.0 | Latest | Latest |

## Package Lock Versions

This project uses npm for package management. The `package-lock.json` file locks all dependencies to specific versions for consistency across environments.

## Updating Dependencies

To update dependencies safely:

```bash
# Check for outdated packages
npm outdated

# Update minor and patch versions (safer)
npm update

# Update specific package
npm update package-name

# Update to latest major version (may have breaking changes)
npm install package-name@latest
```

## Breaking Changes to Watch

### React Native 0.83+
- Requires JDK 17 or 18
- Minimum Android SDK 24
- Minimum iOS 13.4
- React 19 support

### Redux Toolkit 2.x
- RTK Query improvements
- Better TypeScript support
- Performance optimizations

### React Navigation 7.x
- Improved TypeScript support
- Better gesture handling
- Enhanced performance

## Version History

### v0.0.1 (Initial Release)
- React Native 0.83.1
- Full authentication flow
- Redux Toolkit integration
- React Navigation setup
- DummyJSON API integration
- 4 main screens (Home, Listing, Detail, Profile)

## Future Version Planning

### Next Minor Version (0.1.0)
- Add unit tests
- Add integration tests
- Improve error handling
- Add offline support

### Next Major Version (1.0.0)
- Production-ready features
- Performance optimizations
- Complete test coverage
- CI/CD pipeline
- Docker support

## Docker Support (Coming Soon)

Docker containerization will be added to eliminate version-related issues:
- Node.js v22.14.0 container
- JDK 18.0.2.1 pre-installed
- Android SDK pre-configured
- Consistent environment across all machines

## Checking Your Environment

Run these commands to verify your environment matches the required versions:

```bash
# Node.js version
node --version  # Expected: v22.14.0

# npm version
npm --version   # Expected: 10.9.2

# Java version
java -version   # Expected: 18.0.2.1

# React Native version (in project)
npx react-native --version  # Expected: 0.83.1

# Check installed packages
npm list --depth=0
```

## Getting Help

If you encounter version-related issues:

1. Check this VERSION_INFO.md file
2. Review SETUP_GUIDE.md for installation instructions
3. Verify environment variables are set correctly
4. Clear caches and reinstall:
   ```bash
   # Clear npm cache
   npm cache clean --force

   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install

   # Clear Metro bundler cache
   npm start -- --reset-cache
   ```

## Resources

- React Native Releases: https://github.com/facebook/react-native/releases
- Node.js Releases: https://nodejs.org/en/about/releases/
- Java Downloads: https://www.oracle.com/java/technologies/downloads/
- Android Studio: https://developer.android.com/studio
- Xcode: https://developer.apple.com/xcode/

---

**Last Updated**: 2026-01-06

**Maintained By**: Click Development Team

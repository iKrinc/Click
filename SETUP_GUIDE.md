# Setup Guide - Click Mobile App

Complete setup guide for the Click React Native boilerplate.

## System Requirements

### All Platforms
- **Node.js**: v22.14.0 or higher
- **npm**: 10.9.2 or higher (or Yarn 1.22.22)
- **Git**: Latest version

### Android Development
- **Java JDK**: 18.0.2.1 (required)
- **Android Studio**: Latest version (Giraffe 2022.3.1 or newer)
- **Android SDK**: API Level 34 (Android 14.0)
- **Android SDK Platform-Tools**: Latest version
- **Android SDK Build-Tools**: 34.0.0

### iOS Development (macOS only)
- **macOS**: Big Sur (11.0) or newer
- **Xcode**: 14.0 or newer
- **CocoaPods**: 1.11.0 or newer
- **iOS Deployment Target**: 13.4 or newer

## Step-by-Step Setup

### 1. Install Node.js and npm

**Windows:**
1. Download Node.js installer from https://nodejs.org/
2. Run the installer (choose v22.14.0 LTS)
3. Verify installation:
   ```bash
   node --version  # Should output: v22.14.0
   npm --version   # Should output: 10.9.2
   ```

**macOS:**
```bash
# Using Homebrew
brew install node@22

# Verify installation
node --version
npm --version
```

**Linux:**
```bash
# Using NVM (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22.14.0
nvm use 22.14.0

# Verify installation
node --version
npm --version
```

### 2. Install Java JDK 18.0.2.1

**Windows:**
1. Download JDK 18.0.2.1 from Oracle website
2. Run the installer
3. Set JAVA_HOME environment variable:
   - Right-click "This PC" → Properties → Advanced system settings
   - Click "Environment Variables"
   - Add new System Variable:
     - Variable name: `JAVA_HOME`
     - Variable value: `C:\Program Files\Java\jdk-18.0.2.1`
   - Add to PATH: `%JAVA_HOME%\bin`
4. Verify installation:
   ```bash
   java -version  # Should output: java version "18.0.2.1"
   ```

**macOS:**
```bash
# Download JDK 18.0.2.1 from Oracle website
# Or use Homebrew
brew install openjdk@18

# Set JAVA_HOME
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 18)' >> ~/.zshrc
source ~/.zshrc

# Verify installation
java -version
```

**Linux:**
```bash
# Download JDK 18.0.2.1 from Oracle or use package manager
sudo apt install openjdk-18-jdk  # Ubuntu/Debian

# Set JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-18-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc

# Verify installation
java -version
```

### 3. Install Android Studio

1. **Download Android Studio**: https://developer.android.com/studio
2. **Install Android Studio** with default settings
3. **Open Android Studio** and complete the setup wizard
4. **Install Android SDK**:
   - Open SDK Manager (Tools → SDK Manager)
   - Install:
     - Android 14.0 (API Level 34) ✓
     - Android SDK Platform 34 ✓
     - Google Play services ✓
   - SDK Tools tab:
     - Android SDK Build-Tools 34.0.0 ✓
     - Android Emulator ✓
     - Android SDK Platform-Tools ✓
     - Google Play services ✓

5. **Set Environment Variables**:

   **Windows:**
   - Add to System Environment Variables:
     - `ANDROID_HOME`: `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Add to PATH:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\emulator`
     - `%ANDROID_HOME%\tools`
     - `%ANDROID_HOME%\tools\bin`

   **macOS/Linux:**
   ```bash
   # Add to ~/.zshrc or ~/.bashrc
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin

   source ~/.zshrc  # or source ~/.bashrc
   ```

6. **Create Android Virtual Device (AVD)**:
   - Open AVD Manager (Tools → Device Manager)
   - Click "Create Virtual Device"
   - Choose device (e.g., Pixel 5)
   - Download and select system image (API 34)
   - Finish setup

### 4. Install Xcode (macOS only)

1. **Install Xcode from App Store**:
   - Open App Store
   - Search for "Xcode"
   - Install (this takes time, ~12GB)

2. **Install Command Line Tools**:
   ```bash
   xcode-select --install
   ```

3. **Install CocoaPods**:
   ```bash
   sudo gem install cocoapods

   # Verify installation
   pod --version
   ```

4. **Accept Xcode License**:
   ```bash
   sudo xcodebuild -license accept
   ```

### 5. Install React Native CLI

```bash
npm install -g react-native-cli
```

## Project Installation

### 1. Clone/Navigate to Project

```bash
cd click-mobile-app
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Install iOS Dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

## Running the App

### Android

1. **Start an Android emulator** OR connect a physical device
   - Emulator: Open AVD Manager and start your virtual device
   - Physical device: Connect via USB and enable USB debugging

2. **Start Metro bundler**:
   ```bash
   yarn start
   ```

3. **Run the app** (in a new terminal):
   ```bash
   yarn android
   ```

### iOS (macOS only)

1. **Start Metro bundler**:
   ```bash
   yarn start
   ```

2. **Run the app** (in a new terminal):
   ```bash
   yarn ios
   ```

   Or specify a simulator:
   ```bash
   yarn ios --simulator="iPhone 15 Pro"
   ```

## Verification Checklist

- [ ] Node.js v22.14.0 installed (`node --version`)
- [ ] npm 10.9.2 installed (`npm --version`)
- [ ] Java JDK 18.0.2.1 installed (`java -version`)
- [ ] JAVA_HOME environment variable set
- [ ] Android Studio installed
- [ ] Android SDK API Level 34 installed
- [ ] ANDROID_HOME environment variable set
- [ ] Android emulator created and working
- [ ] (macOS) Xcode installed
- [ ] (macOS) CocoaPods installed (`pod --version`)
- [ ] Project dependencies installed (`yarn install`)
- [ ] (macOS) iOS pods installed (`cd ios && pod install`)
- [ ] App runs on Android (`yarn android`)
- [ ] (macOS) App runs on iOS (`yarn ios`)

## Common Setup Issues

### Issue: Java version mismatch
**Solution:** Make sure you have JDK 18.0.2.1 installed and JAVA_HOME is correctly set.

### Issue: Android SDK not found
**Solution:** Verify ANDROID_HOME is set correctly and points to your Android SDK location.

### Issue: Emulator not starting
**Solution:**
1. Enable virtualization in BIOS (Windows)
2. Install Intel HAXM (Windows/Mac)
3. Check available disk space

### Issue: CocoaPods installation fails
**Solution:**
```bash
sudo gem install cocoapods -n /usr/local/bin
```

### Issue: Metro bundler port already in use
**Solution:**
```bash
# Kill process on port 8081
yarn start --reset-cache
```

## Next Steps

After successful setup:
1. Read the [README.md](README.md) for project overview
2. Check the [API Documentation](API_DOCS.md) for available endpoints
3. Start developing!

## Need Help?

- Check the troubleshooting section in README.md
- Review React Native documentation: https://reactnative.dev/
- Check Android Studio setup: https://developer.android.com/studio
- Check Xcode setup: https://developer.apple.com/xcode/

---

**Setup Complete!** You're ready to start developing with Click! 🚀

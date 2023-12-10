import 'dotenv/config';

export default ({ config }) => {
  // Define hashmaps for environment-specific configurations
  const iosBundleIdentifiers = {
    development: 'co.life2point0.ios.dev',
    sandbox: 'co.life2point0.ios.sandbox',
    production: 'co.life2point0.ios',
  };

  const androidPackageNames = {
    development: 'co.life2point0.android.dev',
    sandbox: 'co.life2point0.android.sandbox',
    production: 'co.life2point0.android',
  };

  // Determine the current environment
  const env = process.env.ENV || 'production'; // Default to production if ENV is not set

  // Select the appropriate app ID based on the environment
  const bundleIdentifier = iosBundleIdentifiers[env];
  const packageId = androidPackageNames[env];

  return {
    ...config,
    expo: {
      ...config.expo,
      name: "Life 2.0",
      slug: "life2point0",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./components/assets/app-icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./components/assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#FFF2CB"
      },
      assetBundlePatterns: ["**/*"],
      ios: {
        ...config.expo.ios,
        supportsTablet: true,
        bundleIdentifier,
      },
      android: {
        ...config.expo.android,
        package: packageId,
        notification: {
          icon: "./components/assets/notifications-icon.png"
        },
        adaptiveIcon: {
          foregroundImage: "./components/assets/app-icon.png",
          backgroundColor: "#FFF2CB"
        },
        permissions: ["android.permission.RECORD_AUDIO"],
      },
      web: {
        favicon: "./components/assets/favicon.png"
      },
      extra: {
        eas: {
          projectId: "1d060702-94ac-4b54-8dfb-ed4bac06cbe2"
        }
      },
      owner: "life2point0",
      plugins: [
        [
          "expo-image-picker",
          {
            photosPermission: "Life 2.0 needs access to your photos to upload a profile image."
          }
        ]
      ]
    }
  };
};

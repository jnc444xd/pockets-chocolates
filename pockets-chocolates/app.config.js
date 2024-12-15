import 'dotenv/config';

export default {
    expo: {
        name: "Pockets Chocolates",
        slug: "pockets-chocolates",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "pockets-chocolates",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        updates: {
            fallbackToCacheTimeout: 0
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            bundleIdentifier: "com.pocketschocolates.tracer",
            supportsTablet: true,
            googleServicesFile: "./GoogleService-Info.plist",
            infoPlist: {
                UIBackgroundModes: ["remote-notification"],
            }
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff",
                },
            ],
            "@react-native-firebase/app",
            [
                "expo-build-properties",
                {
                    ios: {
                        useFrameworks: "static"
                    }
                }
            ]
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: process.env.EXPO_PROJECT_ID,
            },
            firebaseConfig: {
                apiKey: process.env.FIREBASE_API_KEY,
                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                projectId: process.env.FIREBASE_PROJECT_ID,
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
                messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
                appId: process.env.FIREBASE_APP_ID
            },
        },
        owner: "jnc444xd",
    },
};
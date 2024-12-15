import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { app } from "../firebase/config";
import GlobalProvider from "../context/GlobalProvider";
// import NotificationProvider from "../context/NotificationProvider";
// import Background from "../components/Background";
// import LoadingScreen from "../components/LoadingScreen";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }

  // if (!fontsLoaded) {
  //   return <LoadingScreen />;
  // }

  // useEffect(() => {
  //   SplashScreen.hideAsync();
  // }, []);

  return (
    <GlobalProvider>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <Toast position="top" />
    </GlobalProvider>
    // <GlobalProvider>
    //   <NotificationProvider>
    //     <GestureHandlerRootView>
    //       <Stack>
    //         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    //         <Stack.Screen name="index" options={{ headerShown: false }} />
    //       </Stack>
    //       <Toast
    //         position="top"
    //       />
    //     </GestureHandlerRootView>
    //   </NotificationProvider>
    // </GlobalProvider>
  );
};

export default RootLayout;
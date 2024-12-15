import { Text, View, TouchableOpacity } from "react-native";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

const Index = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={() => router.push("/sign-in")}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
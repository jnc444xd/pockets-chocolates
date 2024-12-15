import { useState } from "react";
import { Redirect, router } from "expo-router";
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import { signIn } from "../../firebase/auth";
import { FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
    const { loading, isLogged, setIsLogged } = useGlobalContext();

    // if (!loading && isLogged) return <Redirect href="/home" />;

    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isPressed, setIsPressed] = useState(false);

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Toast.show({
                type: "error",
                text1: "Please fill in all fields."
            });
            return;
        }

        setSubmitting(true);

        try {
            const user = await signIn(form.email, form.password);
            setIsLogged(true);

            console.log("Success", "User signed in successfully: ", user);
            Toast.show({
                type: "success",
                text1: "Successfully signed in!"
            });
            router.replace("/home");
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Please check email and password and try again."
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.formContent}>
                        <View style={{ width: "100%" }}>
                            <Text
                                style={{
                                    fontSize: 30,
                                    fontFamily: "Poppins-Bold",
                                    color: "#000",
                                    marginBottom: 16,
                                    marginLeft: 20,
                                }}
                            >
                                Sign In!
                            </Text>
                        </View>
                        <FormField
                            title="Email"
                            value={form.email}
                            handleChangeText={(e) => setForm({ ...form, email: e })}
                            otherStyles="mt-4"
                            keyboardType="email-address"
                        />
                        <FormField
                            title="Password"
                            value={form.password}
                            handleChangeText={(e) => setForm({ ...form, password: e })}
                            otherStyles="mt-4"
                        />
                        <TouchableOpacity
                            onPress={submit}
                            onPressIn={() => setIsPressed(true)}
                            onPressOut={() => setIsPressed(false)}
                            activeOpacity={0.8}
                            className={`rounded-xl min-h-[55px] flex flex-row justify-center items-center w-[150] mt-9`}
                            style={{
                                backgroundColor: isPressed ? "#3DAA52" : "#FFA500",
                            }}
                        >
                            <Text className={`text-white font-psemibold text-xl`}>
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "none",
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    formContent: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default SignIn;
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Alert,
    Image,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import { router } from "expo-router";
import Toast from 'react-native-toast-message'
import { FormField, CustomButton } from "../../components/";
import { useGlobalContext } from "../../context/GlobalProvider";
import { addIncoming } from "../../firebase/database";

const Incoming = () => {
    const { user } = useGlobalContext();

    const [form, setForm] = useState({
        name: "",
        brand: "",
        price: "",
        sku: "",
        quantity: "",
        lotCode: "",
        bestBy: "",
    });
    const [loading, setIsLoading] = useState(false);

    const submit = async () => {
        if (
            form.name === "" ||
            form.brand === "" ||
            form.price === "" ||
            form.sku === "" ||
            form.quantity === "" ||
            form.lotCode === "" ||
            form.bestBy === ""
        ) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        };

        setIsLoading(true);

        try {
            const currentDate = new Date().toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
            const timeStamp = new Date().toLocaleString("en-US", {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const incomingData = {
                name: form.name,
                brand: form.brand,
                price: form.price,
                sku: form.sku,
                quantitiy: form.quantity,
                lotCode: form.lotCode,
                bestBy: form.bestBy,
                createdBy: user.fullName,
                createdAt: currentDate,
            };
            const result = await addIncoming(incomingData);

            setIsLoading(false);

            if (result) {
                Toast.show({
                    type: "success",
                    text1: "Incoming added successfully! 🎉"
                });
            }

            router.replace("/incoming");
        } catch (error) {
            setIsLoading(false);
            console.error("Error", error.message);
            Toast.show({
                type: "error",
                text1: "😕 An error occurred. Please check all fields and try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const submitConfirmation = () => {
        Alert.alert(
            "Confirm",
            "Are you sure you are ready to submit?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed")
                },
                {
                    text: "OK",
                    onPress: () => submit()
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.formContainer}>
                        <FormField
                            title="Product Name"
                            value={form.name}
                            handleChangeText={(e) => setForm({ ...form, name: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <FormField
                            title="Brand"
                            value={form.brand}
                            handleChangeText={(e) => setForm({ ...form, brand: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <FormField
                            title="Price"
                            value={form.price}
                            handleChangeText={(e) => setForm({ ...form, price: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <FormField
                            title="SKU"
                            value={form.sku}
                            handleChangeText={(e) => setForm({ ...form, sku: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <FormField
                            title="Quantity"
                            value={form.quantity}
                            handleChangeText={(e) => setForm({ ...form, quantity: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <FormField
                            title="Lot Code"
                            value={form.lotCode}
                            handleChangeText={(e) => setForm({ ...form, lotCode: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <FormField
                            title="Best By"
                            value={form.bestBy}
                            handleChangeText={(e) => setForm({ ...form, bestBy: e })}
                            otherStyles={{ marginTop: 28 }}
                        />
                        <CustomButton
                            title="Add"
                            handlePress={submitConfirmation}
                            containerStyles={styles.buttonContainer}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    scrollView: {
        paddingBottom: 100,
    },
    formContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingBottom: 100,
        minHeight: Dimensions.get("window").height - 100,
    },
    buttonContainer: {
        marginTop: 28,
        width: 100,
    },
};

export default Incoming;
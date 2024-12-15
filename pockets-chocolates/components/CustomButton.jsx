import { useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { icons } from "../constants";

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <>
            {isLoading ? (
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 16,
                    }}
                >
                    <Image
                        source={icons.loading}
                        style={{
                            width: 50,
                            height: 50,
                        }}
                        resizeMode="contain"
                    />
                </View>
            ) : (
                <TouchableOpacity
                    onPress={handlePress}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    activeOpacity={1}
                    disabled={isLoading}
                    style={{
                        borderRadius: 16,
                        minHeight: 55,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: isPressed ? "#3DAA52" : "#FFA500",
                        opacity: isLoading ? 0.5 : 1,
                        ...containerStyles,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 18,
                            ...textStyles,
                        }}
                    >
                        {title}
                    </Text>
                </TouchableOpacity>
            )}
        </>
    );
};

export default CustomButton;
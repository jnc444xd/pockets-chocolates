import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from "react-native";
import { icons } from "../constants";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputHeight, setInputHeight] = useState(40);

    return (
        <View style={{ marginBottom: 8, ...otherStyles }}>
            <Text
                style={{
                    fontSize: 16,
                    color: "black",
                    fontFamily: "Poppins-Medium",
                    marginBottom: 8,
                }}
            >
                {title}
            </Text>

            <View
                style={{
                    width: "100%",
                    minHeight: 60,
                    paddingHorizontal: 16,
                    backgroundColor: "white",
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: "#203A48",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {title === "Description" ? (
                    <TextInput
                        style={{
                            height: Math.min(120, Math.max(60, inputHeight)),
                            flex: 1,
                            color: "black",
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 16,
                            paddingVertical: 12,
                            textAlignVertical: "center",
                        }}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={handleChangeText}
                        secureTextEntry={title === "Password" && !showPassword}
                        multiline={true}
                        onContentSizeChange={(event) => {
                            setInputHeight(event.nativeEvent.contentSize.height);
                        }}
                        {...props}
                    />
                ) : (
                    <TextInput
                        style={{
                            height: 56,
                            flex: 1,
                            color: "black",
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 16,
                        }}
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7B7B8B"
                        onChangeText={handleChangeText}
                        secureTextEntry={title === "Password" && !showPassword}
                        {...props}
                    />
                )}

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                            }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;

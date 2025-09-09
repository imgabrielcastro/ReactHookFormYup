import { TextInput, View } from "react-native";

export default function Input() {
    return (
        <TextInput
            style={{
                borderWidth: 1,
                borderColor: "#000",
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                width: "45%",
            }}
        />
    )
}
import { TouchableOpacity, View, Text } from "react-native";
import { SCREEN_WIDTH } from "../constants/dimensions";


export default function ButtonConfirm({ value, onPress }: { value: string, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{
                backgroundColor: "#67AFBC",
                padding: 10,
                borderRadius: 5,
                width: SCREEN_WIDTH * 0.35,
                alignItems: "center",
                alignSelf: "center",
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
                <Text style={{ color: "#fff" }}>{value}</Text>
            </View>
        </TouchableOpacity>
    )
}
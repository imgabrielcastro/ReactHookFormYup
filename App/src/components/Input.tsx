import { TextInput } from "react-native";

export default function Input({ value, onChangeText, placeholder, ...rest }) {
  return (
    <TextInput
      style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, width: 200 }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
}

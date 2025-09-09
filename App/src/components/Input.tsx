import { TextInput } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function Input({ value, onChangeText, placeholder, secureTextEntry, ...rest }: InputProps) {
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

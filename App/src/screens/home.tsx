import { View } from "react-native";
import Input from "../components/Input";
import ButtonConfirm from "../components/ButtonConfirm";
import { useForm, Controller } from "react-hook-form";

export default function Home() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Senha"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <ButtonConfirm value="Confirmar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

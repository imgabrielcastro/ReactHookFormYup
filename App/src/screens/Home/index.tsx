import { View, Text } from "react-native";
import Input from "../../components/Input";
import ButtonConfirm from "../../components/ButtonConfirm";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // <-- IMPORTANTE
import { schema } from "./schema";

interface FormData {
  email: string;
  password: string;
}

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors }, 
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);
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
      {/* Campo Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="Email"
              value={value}
              onChangeText={onChange}
            />
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      {/* Campo Senha */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <Input
              placeholder="Senha"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <ButtonConfirm value="Confirmar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

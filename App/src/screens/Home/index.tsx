import { View, Text } from "react-native";
import Input from "../../components/Input";
import ButtonConfirm from "../../components/ButtonConfirm";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import Checkbox from "expo-checkbox";

interface IFormData {
  email: string;
  password: string;
  hasPhone: boolean;
  phone: string | null;
}

export default function Home() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      email: "",
      password: "",
      hasPhone: false,
      phone: null,
    },
    resolver: yupResolver(schema) as any
  });

  const hasPhone = watch("hasPhone");

  const onSubmit: SubmitHandler<IFormData> = (data) => {
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
            <Input placeholder="Email" value={value} onChangeText={onChange} />
            {errors.email && (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {errors.email.message}
              </Text>
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
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      {/* Campo Telefone condicional */}
      {hasPhone && (
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Telefone"
                value={value || ""}
                onChangeText={onChange}
              />
              {errors.phone && (
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  {errors.phone.message}
                </Text>
              )}
            </>
          )}
        />
      )}

      {/* Checkbox */}
      <Controller
        control={control}
        name="hasPhone"
        render={({ field: { onChange, value } }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox value={value} onValueChange={onChange} />
            <Text>Desejo informar telefone</Text>
          </View>
        )}
      />

      <ButtonConfirm value="Confirmar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(10, "Mínimo de 6 caracteres").required("Senha é obrigatória"),
});

import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "Mínimo de 6 caracteres").required("Senha é obrigatória"),
  hasPhone: yup.boolean(),
  phone: yup.string().when("hasPhone", {
    is: true,
    then: (schema) => schema.required("Telefone é obrigatório"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
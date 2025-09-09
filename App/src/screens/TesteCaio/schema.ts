import * as yup from 'yup';

export const confirmarDadosGeraisSchema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    cpf: yup.string().required('CPF é obrigatório'),
    dataNascimento: yup.date().nullable().required('Data de nascimento é obrigatória'),
    fone: yup.string().required('Celular é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});
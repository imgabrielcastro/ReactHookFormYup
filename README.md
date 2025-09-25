# React Native – Formulário Validado com React Hook Form e Yup

Este projeto demonstra o uso de **React Hook Form** em conjunto com **Yup** no React Native para criar um formulário validado, incluindo campos condicionais e mensagens de erro.

---

## Funcionalidades

- Formulário com campos **Email**, **Senha** e **Telefone** (condicional).  
- Validação de campos usando **Yup**:  
  - Email obrigatório e formato válido.  
  - Senha obrigatória com mínimo de 6 caracteres.  
  - Telefone opcional, mas obrigatório se o usuário marcar a opção correspondente.  
- Checkbox para indicar se deseja informar o telefone.  
- Mensagens de erro exibidas dinamicamente abaixo de cada campo.  
- Envio de formulário capturando os dados no console.  

---

## Tecnologias

- **React Native**  
- **React Hook Form** para gerenciamento de formulários  
- **Yup** para validação de esquema  
- Componentes customizados de **Input** e **ButtonConfirm**  
- Checkbox do **Expo**  

---

## Observações

- O uso do **React Hook Form** junto com **Yup** permite criar formulários robustos e escaláveis.  
- Campos condicionais (como o telefone) são validados dinamicamente com base no estado do checkbox `hasPhone`.  
- As mensagens de erro são exibidas imediatamente abaixo do campo correspondente.  
- O esquema de validação está definido em `schema.ts`:

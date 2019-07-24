import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Емейл действительно необходим')
    .email('Это не емейл'),
  password: Yup.string()
    .required('Пароль тоже необходим')
})

export default loginSchema

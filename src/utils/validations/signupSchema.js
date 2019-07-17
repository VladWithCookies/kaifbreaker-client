import * as Yup from 'yup'

import { MIN_PASSWORD_CHARS_COUNT } from '../../constants'

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Имя обязательно к заполнению'),
  lastName: Yup.string()
    .required('Фамилия обязательна к заполнению'),
  email: Yup.string()
    .required('Емейл действительно необходим')
    .email('Это не емейл'),
  password: Yup.string()
    .required('Пароль тоже необходим')
    .min(MIN_PASSWORD_CHARS_COUNT, `Нужно хотябы ${MIN_PASSWORD_CHARS_COUNT} символов`)
})

export default signupSchema

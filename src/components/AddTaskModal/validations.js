import * as Yup from 'yup'

const createTaskSchema = Yup.object().shape({
  content: Yup.string().required('Ну напиши же что-то...'),
})

export default createTaskSchema

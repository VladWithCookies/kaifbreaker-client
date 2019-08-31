import * as Yup from 'yup'

const createProjectSchema = Yup.object().shape({
  title: Yup.string().required('Ну название то ты можешь ввести...'),
})

export default createProjectSchema

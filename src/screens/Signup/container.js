import { withFormik } from 'formik'
import { withRouter } from 'react-router'
import { compose, graphql } from 'react-apollo'

import validationSchema from '../../utils/validations/signupSchema'
import { createUser } from '../../mutations'
import Signup from './component'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const handleSubmit = (values, { props, setFieldError }) => {
  const { mutate } = props
  const { firstName, lastName, email, password } = values

  mutate({
    variables: {
      firstName,
      lastName,
      email,
      password
    }
  }).then(() => {
    props.history.push('/login')
  }).catch(({ graphQLErrors }) => {
    const message = graphQLErrors.map(error => error.message).join(', ')
    console.log(graphQLErrors)
    setFieldError('email', message)
  })
}

export default compose(
  withRouter,
  graphql(createUser),
  withFormik({ handleSubmit, mapPropsToValues, validationSchema })
)(Signup)

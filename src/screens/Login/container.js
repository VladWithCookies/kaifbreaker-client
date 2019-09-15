import Cookies from 'js-cookie'
import { withFormik } from 'formik'
import { withRouter } from 'react-router'
import { compose, graphql } from 'react-apollo'

import { signInUser } from '../../mutations'
import validationSchema from '../../utils/validations/loginSchema'
import Login from './component'

const mapPropsToValues = () => ({
  email: '',
  password: ''
})

const handleSubmit = (values, { props, setFieldError }) => {
  const { mutate, history } = props
  const { email, password } = values

  mutate({
    variables: {
      email,
      password
    }
  }).then(({ data }) => {
    Cookies.set('token', data.signInUser.token)
    history.push('/')
  }).catch(({ graphQLErrors = [] }) => {
    const message = graphQLErrors.map(error => error.message).join(', ')

    setFieldError('api', message)
  })
}

export default compose(
  withRouter,
  graphql(signInUser),
  withFormik({ handleSubmit, mapPropsToValues, validationSchema })
)(Login)

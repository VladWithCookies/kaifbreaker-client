import { withFormik } from 'formik'

import Login from './component'

const mapPropsToValues = () => ({
  email: '',
  password: ''
})

const handleSubmit = () => {

}

export default withFormik({
  handleSubmit,
  mapPropsToValues
})(Login)

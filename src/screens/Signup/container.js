import { withFormik } from 'formik'

import Signup from './component'

const mapPropsToValues = () => ({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const handleSubmit = () => {

}

export default withFormik({
  handleSubmit,
  mapPropsToValues
})(Signup)

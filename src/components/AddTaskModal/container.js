import React, { useState } from 'react'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'

import { createTask } from '../../mutations'
import validationSchema from './validations'
import AddTaskModalComponent from './component'

function AddTaskModal(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AddTaskModalComponent
      {...props}
      isOpen={isOpen}
      onOpen={handleToggleModal}
      onClose={handleToggleModal}
    />
  )
}

const mapPropsToValues = () => ({
  content: '',
})

const handleSubmit = (values, { props }) => {
  const { mutate, projectId } = props

  mutate({
    variables: {
      ...values,
      projectId,
    },
  })
}

export default compose(
  graphql(createTask),
  withFormik({ handleSubmit, mapPropsToValues, validationSchema })
)(AddTaskModal)

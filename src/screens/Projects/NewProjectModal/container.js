import React, { useState } from 'react'
import { withFormik } from 'formik'

import NewProjectModalComponent from './component'

function NewProjectModal(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <NewProjectModalComponent
      {...props}
      isOpen={isOpen}
      onOpen={handleToggleModal}
      onClose={handleToggleModal}
    />
  )
}

const handleSubmit = (values) => {
  console.log(values)
}

const mapPropsToValues = () => ({
  title: '',
  description: '',
  deadline: '',
  isPublic: false
})

export default withFormik(
  handleSubmit,
  mapPropsToValues
)(NewProjectModal)

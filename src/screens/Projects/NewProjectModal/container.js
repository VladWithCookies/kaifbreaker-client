import React, { useState, useEffect } from 'react'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'
import dayjs from 'dayjs'

import { createProject } from '../../../mutations'
import * as updateFunctions from '../../../updateFunctions'
import validationSchema from './validations'
import NewProjectModalComponent from './component'

function NewProjectModal(props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (props.status === 'submitted') {
      setIsOpen(false)
      props.setStatus(null)
    }
  }, [props.status])

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

const handleSubmit = (values, { props, setSubmitting, setStatus, resetForm }) => {
  const { mutate } = props

  mutate({
    variables: values,
    update: updateFunctions.createProject,
    optimisticResponse: {
      createProject: {
        id: -1,
        __typename: 'Project',
        createdAt: dayjs().toString(),
        tasks: [],
        ...values,
      },
    },
    context: {
      tracked: true,
      serializationKey: 'CREATE_PROJECT',
    },
  })

  setSubmitting(false)
  resetForm()
  setStatus('submitted')
}

const mapPropsToValues = () => ({
  title: '',
  description: '',
  deadline: dayjs().add(1, 'week').toString(),
  public: false
})

export default compose(
  graphql(createProject),
  withFormik({ handleSubmit, mapPropsToValues, validationSchema })
)(NewProjectModal)

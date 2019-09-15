import React, { useState, useEffect } from 'react'
import { withFormik } from 'formik'
import { compose, graphql } from 'react-apollo'
import dayjs from 'dayjs'

import { getProjects } from '../../queries'
import { createTask } from '../../mutations'
import validationSchema from './validations'
import AddTaskModalComponent from './component'

function AddTaskModal(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (props.status === 'submitted') {
      setIsOpen(false)
      props.setStatus(null)
    }
  })

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

const handleSubmit = (values, { props, setSubmitting, setStatus, resetForm }) => {
  const { mutate, projectId } = props

  mutate({
    variables: {
      ...values,
      projectId,
    },
    update: (cache, { data: { createTask } }) => {
      const data = cache.readQuery({ query: getProjects })
      const index = data.projects.findIndex(project => project.id === projectId)

      data.projects[index].tasks.push(createTask)
      cache.writeQuery({ query: getProjects, data })
    },
    optimisticResponse: {
      createTask: {
        id: -1,
        __typename: 'Task',
        createdAt: dayjs().toString(),
        ...values,
      },
    },
    context: {
      serializationKey: 'CREATE_TASK',
    }
  })

  setSubmitting(false)
  resetForm()
  setStatus('submitted')
}

export default compose(
  graphql(createTask),
  withFormik({ handleSubmit, mapPropsToValues, validationSchema })
)(AddTaskModal)

import React, { useState, useEffect } from 'react'
import { withFormik } from 'formik'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'

import { getProject } from '../../queries'
import { updateProject } from '../../mutations'
import * as updateFunctions from '../../updateFunctions'
import validationSchema from './validations'
import EditProjectComponent from './component'

function EditProject(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (props.status === 'submitted') {
      setIsOpen(false)
      props.setStatus(null)
    }
  }, [props])

  return (
    <EditProjectComponent
      {...props}
      isOpen={isOpen}
      onOpen={handleToggleModal}
      onClose={handleToggleModal}
    />
  )
}

const mapPropsToValues = ({ data: { project = {} } }) => project

const handleSubmit = (values, { props, setSubmitting, setStatus, resetForm }) => {
  const { mutate, data: { project } } = props

  mutate({
    variables: { id: project.id, ...values },
    update: updateFunctions.updateProject,
    optimisticResponse: {
      updateProject: {
        __typename: 'Project',
        ...project,
        ...values,
      },
    },
    context: {
      tracked: true,
      serializationKey: 'UPDATE_PROJECT',
    }
  })

  setSubmitting(false)
  resetForm()
  setStatus('submitted')
}

export default compose(
  withRouter,
  graphql(getProject, {
    options: ({ match }) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(updateProject),
  withFormik({ handleSubmit, mapPropsToValues, validationSchema })
)(EditProject)

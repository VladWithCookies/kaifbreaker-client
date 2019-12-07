import React from 'react'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'

import { deleteProject } from '../../mutations'
import * as updateFunctions from '../../updateFunctions'
import ProjectDetailsComponent from './component'

function ProjectDetails({ mutate, match, history }) {
  const handleDelete = () => {
    const { id } = match.params

    mutate({
      variables: {
        id
      },
      update: updateFunctions.deleteProject,
      optimisticResponse: {
        deleteProject: {
          id,
          __typename: 'Project',
        },
      },
      context: {
        tracked: true,
        serializationKey: 'DELETE_PROJECT',
      },
    })

    history.push('/')
  }

  return (
    <ProjectDetailsComponent onDelete={handleDelete}/>
  )
}

export default compose(
  graphql(deleteProject),
  withRouter
)(ProjectDetails)

import React from 'react'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'

import { getProject } from '../../queries'
import { deleteProject } from '../../mutations'
import * as updateFunctions from '../../updateFunctions'
import ProjectDetailsComponent from './component'

function ProjectDetails({
  mutate,
  match,
  history,
  data: {
    project
  }
}) {
  const handleDelete = () => {
    const { id } = match.params
    const isSynced = id !== -1

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
        tracked: isSynced,
        serializationKey: 'DELETE_PROJECT',
      },
    })

    history.push('/')
  }

  return (
    <ProjectDetailsComponent
      {...project}
      onDelete={handleDelete}
    />
  )
}

export default compose(
  graphql(getProject, {
    options: ({ match }) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
  graphql(deleteProject),
  withRouter
)(ProjectDetails)

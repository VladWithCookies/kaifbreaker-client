import React from 'react'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'

import { getProjects } from '../../queries'
import { deleteProject } from '../../mutations'
import ProjectDetailsComponent from './component'

function ProjectDetails({ mutate, match, history }) {
  const handleDelete = () => {
    const { id } = match.params

    mutate({
      variables: {
        id
      },
      update: (cache) => {
        const data = cache.readQuery({ query: getProjects })

        data.projects = data.projects.filter((project) => id !== project.id)
        cache.writeQuery({ query: getProjects, data })
      },
      context: {
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

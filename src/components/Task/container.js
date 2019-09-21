import React from 'react'
import { graphql } from 'react-apollo'

import { getProjects } from '../../queries'
import { deleteTask } from '../../mutations'
import TaskComponent from './component'

function Task(props) {
  const handleDelete = () => {
    const { mutate, id, projectId } = props

    mutate({
      variables: {
        id,
      },
      update: (cache) => {
        // TODO
      },
      context: {
        serializationKey: 'DELETE_TASK',
      }
    })
  }

  return (
    <TaskComponent
      {...props}
      onDelete={handleDelete}
    />
  )
}

export default graphql(deleteTask)(Task)

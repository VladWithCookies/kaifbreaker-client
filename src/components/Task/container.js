import React from 'react'
import { graphql } from 'react-apollo'

import * as updateFunctions from '../../updateFunctions'
import { deleteTask } from '../../mutations'
import TaskComponent from './component'

function Task(props) {
  const handleDelete = () => {
    const { mutate, id, projectId } = props

    mutate({
      variables: {
        id,
      },
      update: updateFunctions.deleteTask,
      context: {
        tracked: true,
        serializationKey: 'DELETE_TASK',
      },
      optimisticResponse: {
        deleteTask: {
          id,
          projectId,
          __typename: 'Task',
        },
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

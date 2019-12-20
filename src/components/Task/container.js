import React from 'react'
import { flow } from 'lodash'
import { graphql } from 'react-apollo'

import * as updateFunctions from '../../updateFunctions'
import { deleteTask, updateTask } from '../../mutations'
import TaskComponent from './component'

function Task(props) {
  const handleDelete = () => {
    const { deleteTask, id, projectId } = props
    const isSynced = id !== -1

    deleteTask({
      variables: {
        id,
      },
      update: updateFunctions.deleteTask,
      context: {
        tracked: isSynced,
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

  const handleCheck = () => {
    const { updateTask, id, projectId, done, content } = props

    updateTask({
      variables: {
        id,
        done: !done,
      },
      update: updateFunctions.updateTask,
      context: {
        tracked: true,
        serializationKey: 'UPDATE_TASK'
      },
      optimisticResponse: {
        updateTask: {
          id,
          content,
          done: !done,
          projectId,
          __typename: 'Task',
        },
      }
    })
  }

  return (
    <TaskComponent
      {...props}
      onCheck={handleCheck}
      onDelete={handleDelete}
    />
  )
}

export default flow(
  graphql(deleteTask, { name: 'deleteTask' }),
  graphql(updateTask, { name: 'updateTask' })
)(Task)

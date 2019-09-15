import React from 'react'
import { List } from '@material-ui/core'

import AddTaskModal from '../AddTaskModal'
import Task from '../Task'

export default function ({ id, tasks = [] }) {
  return (
    <React.Fragment>
      <List>
        {tasks.map(task => <Task key={task.id} {...task} />)}
      </List>
      <AddTaskModal projectId={id} />
    </React.Fragment>
  )
}

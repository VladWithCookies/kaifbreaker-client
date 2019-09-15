import React from 'react'
import { List } from '@material-ui/core'

import AddTaskModal from '../AddTaskModal'
import Task from '../Task'

export default function ({ id }) {
  return (
    <React.Fragment>
      <List>
        <Task />
        <Task />
        <Task />
      </List>
      <AddTaskModal projectId={id} />
    </React.Fragment>
  )
}

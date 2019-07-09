import React from 'react'

import { List } from '@material-ui/core'
import AddItemButton from '../AddItemButton'
import Task from '../Task'

export default function() {
  return (
    <React.Fragment>
      <List>
        <Task />
        <Task />
        <Task />
      </List>
      <AddItemButton caption='Добавить задачу' />
    </React.Fragment>
  )
}

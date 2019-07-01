import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core'

export default function Task() {
  return (
    <ListItem dense button>
      <ListItemText primary='Задача' />
    </ListItem>
  )
}

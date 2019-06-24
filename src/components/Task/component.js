import React from 'react'
import { ListItem, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'

export default function Task() {
  return (
    <ListItem dense button>
      <ListItemIcon>
        <Checkbox />
      </ListItemIcon>
      <ListItemText primary='Todo item' />
      <ListItemSecondaryAction>
        <IconButton aria-label='Delete'>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

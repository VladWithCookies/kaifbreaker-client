import React from 'react'
import { Delete } from '@material-ui/icons'
import { ListItem, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core'

export default function Task() {
  return (
    <ListItem dense button>
      <ListItemIcon>
        <Checkbox />
      </ListItemIcon>
      <ListItemText primary='Задача' />
      <ListItemSecondaryAction>
        <IconButton aria-label='Delete'>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

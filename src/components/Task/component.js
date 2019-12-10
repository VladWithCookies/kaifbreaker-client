import React from 'react'
import { Delete } from '@material-ui/icons'
import { ListItem, ListItemText, ListItemIcon, Checkbox, ListItemSecondaryAction, IconButton } from '@material-ui/core'

export default function Task({ content, done, onDelete, onCheck }) {
  return (
    <ListItem onClick={onCheck} dense button>
      <ListItemIcon>
        <Checkbox onChange={onCheck} checked={done} />
      </ListItemIcon>
      <ListItemText primary={content} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label='Delete'
          onClick={onDelete}
        >
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

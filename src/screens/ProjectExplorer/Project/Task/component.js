import React from 'react'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Check } from '@material-ui/icons'

export default function Task() {
  return (
    <ListItem dense>
      <ListItemIcon>
        <Check/>
      </ListItemIcon>
      <ListItemText primary='Задача' />
    </ListItem>
  )
}

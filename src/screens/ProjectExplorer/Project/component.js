import React from 'react'
import { Card, CardHeader, List } from '@material-ui/core'

import AddItemButton from '../../../components/AddItemButton'
import Task from './Task'
import useStyles from './styles'

export default function Prorject() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        title='Название ветки развития'
        className={classes.header}
      />
      <List>
        <Task />
        <Task />
        <Task />
        <Task />
      </List>
      <AddItemButton caption='Добавить к себе' />
    </Card>
  )
}

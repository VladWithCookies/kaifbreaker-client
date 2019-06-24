import React from 'react'
import { Card, CardHeader, CardActions, List, ButtonBase } from '@material-ui/core'

import Task from '../Task'
import useStyles from './styles'

export default function Project() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        title='Todo list title'
        className={classes.header}
      />
      <List>
        <Task />
        <Task />
        <Task />
      </List>
      <ButtonBase className={classes.addButton}>
        <CardActions>
          + Add Task
        </CardActions>
      </ButtonBase>
    </Card>
  )
}

import React from 'react'
import { Card, CardHeader, CardActions, List, ButtonBase } from '@material-ui/core'

import Task from '../../../components/Task'
import useStyles from './styles'

export default function ProjectItem() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        title='Название тудулиста'
        className={classes.header}
      />
      <List>
        <Task />
        <Task />
        <Task />
      </List>
      <ButtonBase className={classes.addButton}>
        <CardActions>
          + Добавить задачу
        </CardActions>
      </ButtonBase>
    </Card>
  )
}

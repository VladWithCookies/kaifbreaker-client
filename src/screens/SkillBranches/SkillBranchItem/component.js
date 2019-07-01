import React from 'react'
import { Card, CardHeader, CardActions, ButtonBase, List } from '@material-ui/core'

import Task from './Task'
import useStyles from './styles'

export default function SkillBranch() {
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
      <ButtonBase className={classes.addButton}>
        <CardActions>
          + Добавить в мои задачи
        </CardActions>
      </ButtonBase>
    </Card>
  )
}

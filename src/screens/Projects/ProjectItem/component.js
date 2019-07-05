import React from 'react'
import { withRouter } from 'react-router'
import { Card, CardHeader, List, ButtonBase } from '@material-ui/core'

import Task from '../../../components/Task'
import AddItemButton from '../../../components/AddItemButton'
import useStyles from './styles'

function ProjectItem({ history }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.button}
        onClick={() => history.push('/project-details')}
      >
        <CardHeader
          title='Название тудулиста'
          className={classes.header}
        />
      </ButtonBase>
      <List>
        <Task />
        <Task />
        <Task />
      </List>
      <AddItemButton caption='Добавить задачу' />
    </Card>
  )
}

export default withRouter(ProjectItem)

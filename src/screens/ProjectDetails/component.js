import React from 'react'
import { Container, CircularProgress, Typography, List, Card, CardHeader, CardContent } from '@material-ui/core'

import Task from '../../components/Task'
import AddItemButton from '../../components/AddItemButton'
import BackNavigation from '../../components/BackNavigation'
import useStyles from './styles'

export default function ProjectDetails() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <BackNavigation title='Project title' />
      <Container className={classes.container}>
        <Card className={classes.card}>
          <CardHeader title='Project description' />
          <CardContent>
            <Typography variant='body1'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
              unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
              dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title='Stats' />
          <CardContent className={classes.stats}>
            <CircularProgress
              variant='static'
              value={45}
            />
            <Typography
              className={classes.statsText}
              variant='h6'
            >
              2/42 hours left
            </Typography>
          </CardContent>
          <CardContent  className={classes.stats}>
            <CircularProgress variant='static' value={75} />
            <Typography
              variant='h6'
              className={classes.statsText}
            >
              2/4 tasks completed
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardHeader title='Tasks' />
          <List>
            <Task />
            <Task />
            <Task />
            <Task />
          </List>
          <AddItemButton caption='Добавить задачу' />
        </Card>
      </Container>
    </React.Fragment>
  )
}

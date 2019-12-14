import React from 'react'
import { Delete } from '@material-ui/icons'
import { Container, Typography, Card, CardHeader, CardContent, Button } from '@material-ui/core'

import Project from '../../components/Project'
import RoundProgress from '../../components/RoundProgress'
import Navigation from './Navigation'
import useStyles from './styles'

export default function ProjectDetails({ onDelete, id, tasks, description }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Navigation />
      <Container className={classes.container}>
        {description && (
          <Card className={classes.card}>
            <CardHeader title='Project description' />
            <CardContent>
              <Typography variant='body1'>
                {description}
              </Typography>
            </CardContent>
          </Card>
        )}
        <Card className={classes.card}>
          <CardHeader title='Stats' />
          <RoundProgress />
          <RoundProgress />
        </Card>
        <Card className={classes.card}>
          <CardHeader title='Tasks' />
          <Project id={id} tasks={tasks} />
        </Card>
        <Button
          onClick={onDelete}
          variant='contained'
          color='secondary'
          fullWidth
        >
          <Delete />
          Delete
        </Button>
      </Container>
    </React.Fragment>
  )
}

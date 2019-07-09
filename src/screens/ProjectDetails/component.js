import React from 'react'
import { Container, Typography, Card, CardHeader, CardContent } from '@material-ui/core'

import Project from '../../components/Project'
import BackNavigation from '../../components/BackNavigation'
import RoundProgress from '../../components/RoundProgress'
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
          <RoundProgress />
          <RoundProgress />
        </Card>
        <Card className={classes.card}>
          <CardHeader title='Tasks' />
          <Project />
        </Card>
      </Container>
    </React.Fragment>
  )
}

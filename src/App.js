import React from 'react'
import { Container, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import Navigation from './components/Navigation'
import Project from './components/Project'
import useStyles from './styles'

export default function App () {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Fab
          color='primary'
          aria-label='Add'
          className={classes.fab}
        >
          <Add />
        </Fab>
      </Container>
      <Navigation />
    </React.Fragment>
  )
}

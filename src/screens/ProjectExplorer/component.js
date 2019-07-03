import React from 'react'
import { Container } from '@material-ui/core'

import Project from './Project'
import useStyles from './styles'

export default function ProjectExplorer() {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <Project />
      <Project />
    </Container>
  )
}

import React from 'react'
import { Container } from '@material-ui/core'

import ProjectItem from './ProjectItem'
import NewProjectModal from './NewProjectModal'
import useStyles from './styles'

export default function Projects() {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <ProjectItem />
      <NewProjectModal />
    </Container>
  )
}

import React from 'react'
import { Container } from '@material-ui/core'

import ProjectItem from './ProjectItem'
import NewProjectModal from './NewProjectModal'
import useStyles from './styles'

export default function Projects({ data: { projects } }) {
  const classes = useStyles()
  console.log(projects)
  return (
    <Container className={classes.container}>
      {projects.map((project) => <ProjectItem key={project.id} {...project} />)}
      <NewProjectModal />
    </Container>
  )
}

import React from 'react'
import { isEmpty } from 'ramda'
import { Container } from '@material-ui/core'

import ProjectItem from './ProjectItem'
import NewProjectModal from './NewProjectModal'
import EmptyState from '../../components/EmptyState'
import useStyles from './styles'

export default function Projects({ data: { projects = [] } }) {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      {projects.map((project) => <ProjectItem key={project.id} {...project} />)}
      {isEmpty(projects) && <EmptyState />}
      <NewProjectModal />
    </Container>
  )
}

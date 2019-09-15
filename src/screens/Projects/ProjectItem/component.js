import React from 'react'
import { Card, CardHeader, ButtonBase } from '@material-ui/core'

import Project from '../../../components/Project'
import useStyles from './styles'

function ProjectItem({ project, onShowDetails }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.button}
        onClick={onShowDetails}
      >
        <CardHeader
          title={project.title}
          className={classes.header}
        />
      </ButtonBase>
      <Project {...project} />
    </Card>
  )
}

export default ProjectItem

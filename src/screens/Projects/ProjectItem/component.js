import React from 'react'
import { Card, CardHeader, ButtonBase } from '@material-ui/core'

import Project from '../../../components/Project'
import useStyles from './styles'

function ProjectItem({ id, title, onShowDetails }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.button}
        onClick={onShowDetails}
      >
        <CardHeader
          title={title}
          className={classes.header}
        />
      </ButtonBase>
      <Project id={id} />
    </Card>
  )
}

export default ProjectItem

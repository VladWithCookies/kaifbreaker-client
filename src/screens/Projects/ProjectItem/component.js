import React from 'react'
import { withRouter } from 'react-router'
import { Card, CardHeader, ButtonBase } from '@material-ui/core'

import Project from '../../../components/Project'
import useStyles from './styles'

function ProjectItem({ history, title }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.button}
        onClick={() => history.push('/project-details')}
      >
        <CardHeader
          title={title}
          className={classes.header}
        />
      </ButtonBase>
      <Project />
    </Card>
  )
}

export default withRouter(ProjectItem)

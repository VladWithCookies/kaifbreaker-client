import React from 'react'
import { Typography } from '@material-ui/core'

import useStyles from './styles'

export default function EmptyState() {
  const classes = useStyles()

  return (
    <Typography
      className={classes.content}
      color='textSecondary'
    >
      ПОКА ЧТО ТУТ ПУСТО
    </Typography>
  )
}

import React from 'react'
import { CircularProgress, Typography, CardContent } from '@material-ui/core'

import useStyles from './styles'

export default function RoundProgress() {
  const classes = useStyles()

  return (
    <CardContent className={classes.stats}>
      <CircularProgress
        variant='static'
        value={45}
      />
      <Typography
        className={classes.statsText}
        variant='h6'
      >
        2/42 hours left
      </Typography>
    </CardContent>
  )
}

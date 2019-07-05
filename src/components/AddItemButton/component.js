import React from 'react'
import { CardActions, ButtonBase } from '@material-ui/core'

import useStyles from './styles'

export default function AddItemButton({ caption }) {
  const classes = useStyles()

  return (
    <ButtonBase className={classes.addButton}>
      <CardActions>
        + {caption}
      </CardActions>
    </ButtonBase>
  )
}

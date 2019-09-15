import React from 'react'
import { CardActions, ButtonBase } from '@material-ui/core'

import useStyles from './styles'

export default function AddItemButton({ caption, onClick }) {
  const classes = useStyles()

  return (
    <ButtonBase
      onClick={onClick}
      className={classes.addButton}
    >
      <CardActions>
        + {caption}
      </CardActions>
    </ButtonBase>
  )
}

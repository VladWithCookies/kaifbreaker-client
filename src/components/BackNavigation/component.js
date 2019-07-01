import React from 'react'
import { ArrowBack } from '@material-ui/icons'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

export default function ProjectDetails({ title }) {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='Back'
        >
          <ArrowBack />
        </IconButton>
        <Typography variant='h6'>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

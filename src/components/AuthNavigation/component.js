import React from 'react'
import { withRouter } from 'react-router'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Input, AccountCircle } from '@material-ui/icons'
import useStyles from './styles'

function AuthNavigation({ onLoginClick, onSignupClick }) {
  const classes = useStyles()

  return (
    <BottomNavigation
      showLabels
      className={classes.container}
    >
      <BottomNavigationAction
        icon={<Input />}
        label='ВОЙТИ'
        onClick={onLoginClick}
        className={classes.action}
      />
      <BottomNavigationAction
        icon={<AccountCircle />}
        label='СОЗДАТЬ АККАУНТ'
        onClick={onSignupClick}
        className={classes.action}
      />
    </BottomNavigation>
  )
}

export default withRouter(AuthNavigation)

import React from 'react'
import { withRouter } from 'react-router'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Input, AccountCircle } from '@material-ui/icons'
import useStyles from './styles'

function AuthNavigation({ history }) {
  const classes = useStyles()

  return (
    <BottomNavigation
      showLabels
      className={classes.container}
    >
      <BottomNavigationAction
        icon={<Input />}
        label='ВОЙТИ'
        className={classes.action}
        onClick={() => history.push('/login')}
      />
      <BottomNavigationAction
        icon={<AccountCircle />}
        label='СОЗДАТЬ АККАУНТ'
        className={classes.action}
        onClick={() => history.push('/signup')}
      />
    </BottomNavigation>
  )
}

export default withRouter(AuthNavigation)

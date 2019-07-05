import React from 'react'
import { withRouter } from 'react-router'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Search, List } from '@material-ui/icons'
import useStyles from './styles'

function Navigation({ history }) {
  const classes = useStyles()

  return (
    <BottomNavigation
      showLabels
      className={classes.container}
    >
      <BottomNavigationAction
        icon={<List />}
        label='ЗАДАЧИ'
        className={classes.action}
        onClick={() => history.push('/')}
      />
      <BottomNavigationAction
        icon={<Search />}
        label='НАЙТИ ЧЕМ ЗАНЯТЬСЯ'
        className={classes.action}
        onClick={() => history.push('/project-explorer')}
      />
    </BottomNavigation>
  )
}

export default withRouter(Navigation)

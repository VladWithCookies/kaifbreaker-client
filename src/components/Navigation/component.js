import React from 'react'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Search, List } from '@material-ui/icons'
import useStyles from './styles'

export default function Navigation({
  onTasksClick,
  onProjectExplorerClick
}) {
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
        onClick={onTasksClick}
      />
      <BottomNavigationAction
        icon={<Search />}
        label='НАЙТИ ЧЕМ ЗАНЯТЬСЯ'
        className={classes.action}
        onClick={onProjectExplorerClick}
      />
    </BottomNavigation>
  )
}

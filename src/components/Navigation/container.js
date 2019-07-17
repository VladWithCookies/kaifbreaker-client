import React from 'react'
import { withRouter } from 'react-router'

import NavigationComponent from './component'

function Navigation({ history }) {
  const handleTaskClick = () => {
    history.push('/')
  }

  const handleProjectExplorerClick = () => {
    history.push('/project-explorer')
  }

  return (
    <NavigationComponent
      onTasksClick={handleTaskClick}
      onProjectExplorerClick={handleProjectExplorerClick}
    />
  )
}

export default withRouter(Navigation)

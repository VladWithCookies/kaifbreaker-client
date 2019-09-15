import React from 'react'
import { withRouter } from 'react-router'

import ProjectItemComponent from './component'

function ProjectItem({ id, title, history }) {
  const handleShowDetails = () => {
    history.push(`/projects/${id}`)
  }

  return (
    <ProjectItemComponent
      id={id}
      title={title}
      onShowDetails={handleShowDetails}
    />
  )
}

export default withRouter(ProjectItem)

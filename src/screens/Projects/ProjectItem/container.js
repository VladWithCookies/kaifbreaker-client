import React from 'react'
import { withRouter } from 'react-router'

import ProjectItemComponent from './component'

function ProjectItem({ project, history }) {
  const handleShowDetails = () => {
    history.push(`/projects/${project.id}`)
  }

  return (
    <ProjectItemComponent
      project={project}
      onShowDetails={handleShowDetails}
    />
  )
}

export default withRouter(ProjectItem)

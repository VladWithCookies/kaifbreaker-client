import React from 'react'
import { compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router'

import { getProject } from '../../../queries'
import NavigationComponent from './component'

function Navigation({
  history,
  data: { project },
}) {
  return (
    <NavigationComponent
      {...project}
      onClick={history.goBack}
    />
  )
}

export default compose(
  withRouter,
  graphql(getProject, {
    options: ({ match }) => ({
      variables: {
        id: match.params.id
      }
    })
  }),
)(Navigation)

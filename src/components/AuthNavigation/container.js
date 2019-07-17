import React from 'react'
import { withRouter } from 'react-router'

import AuthNavigationComponent from './component'

function AuthNavigation({ history }) {
  const handleLoginClick = () => {
    history.push('/login')
  }

  const handleSignupClick = () => {
    history.push('/signup')
  }

  return (
    <AuthNavigationComponent
      onLoginClick={handleLoginClick}
      onSignupClick={handleSignupClick}
    />
  )
}

export default withRouter(AuthNavigation)

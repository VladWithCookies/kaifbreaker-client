import React from 'react'
import { Route, Redirect } from 'react-router'

import isLoggedIn from '../../utils/auth/isLoggedIn'
import GuestLayout from '../GuestLayout'

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isLoggedIn()
      ? <Redirect to="/" />
      : (
        <GuestLayout>
          <Component {...props } />
        </GuestLayout>
      )
    }
  />
)

export default GuestRoute

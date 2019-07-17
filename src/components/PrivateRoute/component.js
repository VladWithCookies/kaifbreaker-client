import React from 'react'
import { Route, Redirect } from 'react-router'

import isLoggedIn from '../../utils/auth/isLoggedIn'
import PrivateLayout from '../PrivateLayout'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isLoggedIn()
      ? (
        <PrivateLayout>
          <Component {...props } />
        </PrivateLayout>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

export default PrivateRoute

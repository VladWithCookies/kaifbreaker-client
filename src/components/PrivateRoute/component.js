import React from 'react'
import { Route, Redirect } from 'react-router'

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isLoggedIn
      ? <Component {...props } />
      : <Redirect to="/login" />
    }
  />
)

export default PrivateRoute

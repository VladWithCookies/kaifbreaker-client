import React from 'react';
import { Route, Redirect } from 'react-router'

const GuestRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => isLoggedIn
      ? <Redirect to="/" />
      : <Component {...props } />
    }
  />
)

export default GuestRoute

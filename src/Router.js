import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import GuestRoute from './components/GuestRoute'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Projects from './screens/Projects'
import ProjectExplorer from './screens/ProjectExplorer'
import ProjectDetails from './screens/ProjectDetails'

export default function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <GuestRoute exact path='/signup' component={Signup} />
        <GuestRoute exact path='/login' component={Login} />

        <PrivateRoute exact path='/' component={Projects} />
        <PrivateRoute exact path='/project-explorer' component={ProjectExplorer} />
        <PrivateRoute exact path='/project-details' component={ProjectDetails} />
      </Switch>
    </BrowserRouter>
  )
}

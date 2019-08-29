import React from 'react'
import { Switch, HashRouter } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import GuestRoute from './components/GuestRoute'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Projects from './screens/Projects'
import ProjectExplorer from './screens/ProjectExplorer'
import ProjectDetails from './screens/ProjectDetails'

export default function Router() {
  return (
    <HashRouter basename='/'>
      <Switch>
        <GuestRoute exact path='/signup' component={Signup} />
        <GuestRoute exact path='/login' component={Login} />

        <PrivateRoute exact path='/' component={Projects} />
        <PrivateRoute exact path='/project-explorer' component={ProjectExplorer} />
        <PrivateRoute exact path='/project-details' component={ProjectDetails} />
      </Switch>
    </HashRouter>
  )
}

import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import NavigationLayout from './components/NavigationLayout'
import Projects from './screens/Projects'
import ProjectDetails from './screens/ProjectDetails'

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        <NavigationLayout>
          <Route exact path='/' component={Projects} />
          <Route exact path='/skill-branches' component={ProjectDetails} />
        </NavigationLayout>
      </Switch>
    </BrowserRouter>
  )
}

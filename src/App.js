import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import NavigationLayout from './components/NavigationLayout'
import Projects from './screens/Projects'
import SkillBranches from './screens/SkillBranches'

export default function App () {
  return (
    <BrowserRouter>
      <Switch>
        <NavigationLayout>
          <Route exact path='/' component={Projects} />
          <Route exact path='/skill-branches' component={SkillBranches} />
        </NavigationLayout>
      </Switch>
    </BrowserRouter>
  )
}

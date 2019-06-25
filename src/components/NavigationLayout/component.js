import React from 'react'

import Navigation from '../Navigation'

export default function NavigationLayout({ children }) {
  return (
    <React.Fragment>
      {children}
      <Navigation />
    </React.Fragment>
  )
}

import React from 'react'

import Navigation from '../Navigation'

export default function PrivateLayout({ children }) {
  return (
    <React.Fragment>
      {children}
      <Navigation />
    </React.Fragment>
  )
}

import React from 'react'

import AuthNavigation from '../AuthNavigation'

export default function GuestLayout({ children }) {
  return (
    <React.Fragment>
      {children}
      <AuthNavigation />
    </React.Fragment>
  )
}

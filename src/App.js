import React from 'react'
import { ApolloProvider } from 'react-apollo'

import client from './apolloClient'
import Router from './Router'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}

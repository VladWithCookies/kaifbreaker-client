import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Router from '../../Router'

export default function App({ client, loading }) {
  if (loading) {
    return 'Replace me with loader!'
  }

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}

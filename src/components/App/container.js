import React, { useEffect, useState } from 'react'

import getApolloClient from '../../apolloClient'
import AppComponent from './component'

export default function App() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client)
      setLoading(false)
    })
  }, [])

  return <AppComponent client={client} loading={loading} />
}

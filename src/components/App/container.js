import React, { useEffect, useState } from 'react'

import * as updateFunctions from '../../updateFunctions'
import getApolloClient from '../../apolloClient'
import AppComponent from './component'

export default function App() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('offline', () => setOnline(false))
    window.addEventListener('online', () => setOnline(true))
  }, [])

  useEffect(() => {
    if (!client || !online) return

    const execute = async () => {
      const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []

      const promises = trackedQueries.map(({ variables, query, context, operationName }) => client.mutate({
        context,
        variables,
        mutation: query,
        update: updateFunctions[operationName],
        optimisticResponse: context.optimisticResponse,
      }))

      await Promise.all(promises)

      window.localStorage.setItem('trackedQueries', [])
    }

    execute()
  }, [client])

  return <AppComponent client={client} loading={loading} />
}

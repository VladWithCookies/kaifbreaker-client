import React from 'react'
import { ApolloProvider } from 'react-apollo'

import Loader from '../Loader'
import Router from '../../Router'
import useStyles from './styles'

export default function App({ client, loading }) {
  const classes = useStyles()

  if (loading) {
    return (
      <div className={classes.loaderContainer}>
        <Loader />
      </div>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}

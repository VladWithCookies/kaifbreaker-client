import Cookies from 'js-cookie'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import QueueLink from 'apollo-link-queue'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import SerializingLink from 'apollo-link-serialize'
import { CachePersistor } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_HOST = process.env.NODE_ENV === 'production'
  ? 'https://cryptic-bayou-76235.herokuapp.com/graphql'
  : 'http://localhost:3000/graphql'

const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const getApolloClient = async () => {
  const httpLink = new HttpLink({ uri: API_HOST })
  const retryLink = new RetryLink({ attempts: { max: Infinity } })

  const authLink = setContext(({ headers }) => {
    const token = Cookies.get('token')

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const errorLink = onError(({ networkError }) => {
    if (networkError && networkError.statusCode === 401) {
      Cookies.remove('token')
      window.location.replace('/login')
    }
  })

  const queueLink = new QueueLink()

  window.addEventListener('offline', () => queueLink.close())
  window.addEventListener('online', () => queueLink.open())

  const serializingLink = new SerializingLink()

  const trackerLink = new ApolloLink((operation, forward) => {
    if (!forward) return null

    const context = operation.getContext()
    const trackedQueries = JSON.parse(window.localStorage.getItem('trackedQueries') || null) || []

    if (context.tracked !== undefined) {
      const { operationName, query, variables } = operation

      const newTrackedQuery = {
        query,
        context,
        variables,
        operationName,
      }

      window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]))
    }

    return forward(operation).map((data) => {
      if (context.tracked !== undefined) {
        window.localStorage.setItem('trackedQueries', trackedQueries)
      }

      return data
    })
  })

  const link = ApolloLink.from([
    trackerLink,
    queueLink,
    serializingLink,
    retryLink,
    errorLink,
    authLink,
    httpLink
  ])

  const cache = new InMemoryCache()

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
  })

  const currentVersion = await window.localStorage.getItem(SCHEMA_VERSION_KEY)

  if (currentVersion === SCHEMA_VERSION) {
    await persistor.restore();
  } else {
    await persistor.purge()
    await window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
  }

  const client = new ApolloClient({
    link,
    cache,
  })

  return client
}

export default getApolloClient

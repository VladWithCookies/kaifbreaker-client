import Cookies from 'js-cookie'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { CachePersistor } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_HOST = 'http://localhost:3000/graphql'
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

  const link = ApolloLink.from([
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

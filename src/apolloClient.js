import Cookies from 'js-cookie'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { persistCache } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_HOST = 'http://localhost:3000/graphql'

const getApolloClient = async () => {
  const httpLink = new HttpLink({ uri: API_HOST })

  const retryLink = new RetryLink({
    attempts: { max: Infinity, initial: 500 },
    attempts: { max: Infinity },
  })

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

  const cache = new InMemoryCache()

  await persistCache({
    cache,
    storage: window.localStorage
  })

  const link = ApolloLink.from([
    errorLink,
    authLink,
    retryLink,
    httpLink
  ])

  const client = new ApolloClient({ cache, link })

  return client
}

export default getApolloClient

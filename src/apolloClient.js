import Cookies from 'js-cookie'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const API_HOST = 'http://localhost:3000/graphql'
const httpLink = new HttpLink({ uri: API_HOST })

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink.concat(httpLink))
})

export default client

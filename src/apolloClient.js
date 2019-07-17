import ApolloClient from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'

const API_HOST = 'localhost:3000'

const client = new ApolloClient({
  link: new HttpLink({ uri: API_HOST })
})

export default client

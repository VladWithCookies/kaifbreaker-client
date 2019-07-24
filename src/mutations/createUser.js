import graphql from 'graphql-tag'

export default graphql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      firstName,
      lastName
    }
  }
`

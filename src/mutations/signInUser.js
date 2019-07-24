import graphql from 'graphql-tag'

export default graphql`
  mutation signInUser($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`

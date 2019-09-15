import graphql from 'graphql-tag'

export default graphql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id,
    }
  }
`

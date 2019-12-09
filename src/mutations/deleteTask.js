import graphql from 'graphql-tag'

export default graphql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id,
      projectId
    }
  }
`

import graphql from 'graphql-tag'

export default graphql`
  mutation updateTask($id: ID!, $done: Boolean!) {
    updateTask(id: $id, done: $done) {
      id,
      done,
      content,
      projectId
    }
  }
`

import graphql from 'graphql-tag'

export default graphql`
  query project($id: ID!) {
    project(id: $id) {
      id,
      title,
      public,
      deadline,
      description,
      tasks {
        id,
        done,
        content
        projectId,
      }
    }
  }
`

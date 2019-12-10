import graphql from 'graphql-tag'

export default graphql`
  query {
    projects {
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

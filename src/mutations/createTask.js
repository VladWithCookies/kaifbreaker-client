import graphql from 'graphql-tag'

export default graphql`
  mutation createTask($content: String!, $projectId: ID!) {
    createTask(content: $content, projectId: $projectId) {
      id,
      content,
      projectId
    }
  }
`

import graphql from 'graphql-tag'

export default graphql`
  mutation createProject($title: String!, $description: String, $deadline: String!, $public: Boolean!) {
    createProject(title: $title, description: $description, deadline: $deadline, public: $public) {
      id,
      title,
      public,
      deadline,
      createdAt,
      description,
      tasks {
        id
      }
    }
  }
`

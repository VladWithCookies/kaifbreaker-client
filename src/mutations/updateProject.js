import graphql from 'graphql-tag'

export default graphql`
  mutation updateProject($id: ID!, $title: String!, $description: String, $public: Boolean!) {
    updateProject(id: $id, title: $title, description: $description, public: $public) {
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

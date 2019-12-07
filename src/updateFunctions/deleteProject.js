import { getProjects } from '../queries'

const deleteProject = (cache, { data: { deleteProject }}) => {
  const data = cache.readQuery({ query: getProjects })

  data.projects = data.projects.filter((project) => deleteProject.id !== project.id)
  cache.writeQuery({ query: getProjects, data })
}

export default deleteProject

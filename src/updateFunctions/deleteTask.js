import { getProjects } from '../queries'

const deleteTask = (cache, { data: { deleteTask } }) => {
  const data = cache.readQuery({ query: getProjects })
  const index = data.projects.findIndex(project => project.id === deleteTask.projectId)

  data.projects[index].tasks = data.projects[index].tasks.filter(({ id }) => id !== deleteTask.id)
  cache.writeQuery({ query: getProjects, data })
}

export default deleteTask

import { getProjects } from '../queries'

const updateTask = (cache, { data: { updateTask } }) => {
  const data = cache.readQuery({ query: getProjects })
  const projectIndex = data.projects.findIndex(({ id }) => id === updateTask.projectId)
  const taskIndex = data.projects[projectIndex].tasks.findIndex(({ id }) => id === updateTask.id)

  data.projects[projectIndex].tasks[taskIndex] = updateTask
  cache.writeQuery({ query: getProjects, data })
}

export default updateTask

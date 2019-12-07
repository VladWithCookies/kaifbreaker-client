import { getProjects } from '../queries'

const createTask = (cache, { data: { createTask } }) => {
  const data = cache.readQuery({ query: getProjects })
  const index = data.projects.findIndex(project => project.id === createTask.projectId)

  data.projects[index].tasks.push(createTask)
  cache.writeQuery({ query: getProjects, data })
}

export default createTask

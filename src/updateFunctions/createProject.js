import { getProjects } from '../queries'

const createProject = (cache, { data: { createProject } }) => {
  const data = cache.readQuery({ query: getProjects })

  data.projects.push(createProject)
  cache.writeQuery({ query: getProjects, data })
}

export default createProject

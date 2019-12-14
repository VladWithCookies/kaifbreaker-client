import { getProject } from '../queries'

const updateProject = (cache, { data: { updateProject } }) => {
  const data = cache.readQuery({ query: getProject })

  data.project = updateProject
  cache.writeQuery({ query: getProject, data })
}

export default updateProject

import { graphql } from 'react-apollo'

import { getProjects } from '../../queries'
import Projects from './component'

export default graphql(getProjects)(Projects)

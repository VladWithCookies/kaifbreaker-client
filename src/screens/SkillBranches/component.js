import React from 'react'
import { Container } from '@material-ui/core'

import SkillBranchItem from './SkillBranchItem'
import useStyles from './styles'

export default function SkillBranches() {
  const classes = useStyles()

  return (
    <Container className={classes.container}>
      <SkillBranchItem />
      <SkillBranchItem />
    </Container>
  )
}

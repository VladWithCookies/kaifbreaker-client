import { makeStyles } from '@material-ui/core/styles'
import { pink } from '@material-ui/core/colors'

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    bottom: 80,
    right: 20,
    backgroundColor: pink['500']
  },
  dialog: {
    opacity: 0.8
  }
})

export default useStyles

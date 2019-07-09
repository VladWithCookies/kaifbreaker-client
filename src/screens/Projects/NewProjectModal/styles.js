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
    opacity: 0.9
  },
  formContainer: {
    padding: 100,
    height: '100vh'
  },
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

export default useStyles

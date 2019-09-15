import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
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

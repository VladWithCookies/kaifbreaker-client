import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles({
  container: {
    backgroundColor: grey['200'],
    padding: 20,
    height: '100%',
    minHeight: '100vh',
    paddingBottom: 50
  }
})

export default useStyles

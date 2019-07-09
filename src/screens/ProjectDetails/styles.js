import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles({
  container: {
    backgroundColor: grey['200'],
    height: '100%',
    minHeight: '100vh',
    paddingTop: 76,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50
  },
  card: {
    marginBottom: 20
  }
})

export default useStyles

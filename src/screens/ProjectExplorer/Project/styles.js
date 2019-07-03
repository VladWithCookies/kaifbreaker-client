import { makeStyles } from '@material-ui/core/styles'
import { indigo, grey } from '@material-ui/core/colors'

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  header: {
    textAlign: 'center',
    backgroundColor: indigo['500'],
    color: 'white'
  },
  addButton: {
    padding: 5,
    width: '100%',
    fontSize: 24,
    color: grey['500']
  }
})

export default useStyles

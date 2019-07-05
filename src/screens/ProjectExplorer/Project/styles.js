import { makeStyles } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'

const useStyles = makeStyles({
  card: {
    marginBottom: 20
  },
  header: {
    textAlign: 'center',
    backgroundColor: indigo['500'],
    color: 'white'
  }
})

export default useStyles

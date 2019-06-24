import { makeStyles } from '@material-ui/core/styles';
import { grey, pink } from '@material-ui/core/colors'

const useStyles = makeStyles({
  container: {
    backgroundColor: grey['200'],
    padding: 20,
    height: '100%',
    minHeight: '100vh'
  },
  fab: {
    position: 'fixed',
    bottom: 80,
    right: 20,
    backgroundColor: pink['500']
  }
})

export default useStyles

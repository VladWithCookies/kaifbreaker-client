import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: 52
  },
  action: {
    maxWidth: '100%',
    marginRight: 0,
    marginLeft: 0,
  }
})

export default useStyles

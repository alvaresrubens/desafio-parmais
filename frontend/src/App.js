import './App.css';
import Form from './views/Form';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    fontFamily: 'Mulish',
  },
  main: {
    padding: '1.5%',
  }


});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
       <Form />
    </div>
  );
}

export default App;

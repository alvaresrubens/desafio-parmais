import "./App.css";
import Form from "./views/Form";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  main: {
    display: "flex",
    margin: "20%",
    justifyContent: "center",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Form />
    </div>
  );
}

export default App;

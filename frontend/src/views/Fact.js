import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
  },
}));

function Fact(props) {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Paper elevation={3}>
        <div>{props.fact}</div>
      </Paper>
    </div>
  );
}

export default Fact;

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  factBox: {
    marginTop: "20px",
    width: "680px",
    height: "172px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    boxShadow: "0px 3px 12px rgba(62, 69, 87, 0.25)",
    borderRadius: "10px",
  },
  factDescription: {
    fontFamily: "Mulish",
    fontSize: " 14px",
    lineHeight: "21px",
    padding: "5% 10%",
    textAlign: "center",

    color: "#20232D",
  },
}));

function Fact(props) {
  const classes = useStyles();

  return (
    <div className={classes.factBox}>
      <div className={classes.factDescription}>{props.fact}</div>
    </div>
  );
}

export default Fact;

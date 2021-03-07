import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  factBox: {
    width: " 608px",
    height: "172px",
    left: "336px",
    top: "364.26px",

    background: " #FFFFFF",

    boxShadow: "0px 3px 12px rgba(62, 69, 87, 0.25)",
    borderRadius: "10px",
  },
  factDescription: {
    width: "560px",
    height: "76px",
    left: "360px",
    top: "412.26px",

    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: " 14px",
    lineHeight: "21px",

    display: "flex",
    alignItems: "center",
    textAlign: "center",

    color: "#20232D",
  },
}));

function Fact(props) {
  const classes = useStyles();

  return (
    <div className={classes.factBox}>
      <div className={(classes.factBox, classes.factDescription)}>
        {props.fact}
      </div>
    </div>
  );
}

export default Fact;

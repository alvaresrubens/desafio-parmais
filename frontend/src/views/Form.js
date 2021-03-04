import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  const [category, setCategory] = React.useState("");

  const [fact, setFact] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const searchFacts = () => {
    fetch(`http://localhost:3030/search-fact`, {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        console.log(data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form className={classes.container} noValidate>
      <FormControl className={classes.formControl}>
        <TextField id="search" label="Search" />
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel shrink id="category">
          Category
        </InputLabel>
        <Select
          labelId="category-select"
          id="category-select"
          value={category}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          <MenuItem value={"Any"}>Any</MenuItem>
          <MenuItem value={"Animal"}>Animal</MenuItem>
          <MenuItem value={"Career"}>Career</MenuItem>
          <MenuItem value={"Celebrity"}>Celebrity</MenuItem>
          <MenuItem value={"Dev"}>Dev</MenuItem>
          <MenuItem value={"Explicit"}>Explicit</MenuItem>
          <MenuItem value={"Fashion"}>Fashion</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"History"}>History</MenuItem>
          <MenuItem value={"Money"}>Money</MenuItem>
          <MenuItem value={"Movie"}>Movie</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Political"}>Political</MenuItem>
          <MenuItem value={"Religion"}>Religion</MenuItem>
          <MenuItem value={"Science"}>Science</MenuItem>
          <MenuItem value={"Sport"}>Sport</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
        </Select>
      </FormControl>
      <Button
        className={classes.button}
        onClick={() => searchFacts()}
        variant="contained"
        color="primary"
      >
        Get a new random fact!
      </Button>
    </form>
  );
}

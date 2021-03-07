import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Fact from "./Fact";

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

  const [factData, setFactData] = useState([]);

  const [category, setCategory] = useState("");

  const [freeText, setFreeText] = useState("");

  const handleFreeText = (event) => {
    setFreeText(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    fetch("http://localhost:3030/categories", {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        setCategories(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const searchFacts = () => {
    console.log(freeText, category);

    if (
      (freeText !== "" && category !== "") ||
      (freeText === "" && category === "")
    ) {
      randomFact();
    } else {
      if (freeText !== "" && category === "") {
        freeSearch(freeText);
      } else {
        categorySearch(category);
      }
    }
  };

  const categorySearch = (categoryQuery) => {
    fetch(`http://localhost:3030/category${categoryQuery}`, {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        console.log(data);
        let newArray = [...factData];
        newArray.unshift(data);
        setFactData(newArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const freeSearch = (text) => {
    fetch(`http://localhost:3030/search${text}`, {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        setFactData(data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const randomFact = () => {
    fetch(`http://localhost:3030/search-fact`, {
      method: "GET",
    })
      .then((results) => results.json())
      .then((data) => {
        let newArray = [...factData];
        newArray.unshift(data);
        setFactData(newArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const cleanResults = () => {
    setFactData([]);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // eslint-disable-next-line
  useEffect(() => loadCategories(), []);
  console.log(factData);
  return (
    <div>
      <form className={classes.container} noValidate>
        <FormControl className={classes.formControl}>
          <TextField
            value={freeText}
            onChange={handleFreeText}
            id="search"
            label="Search"
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel shrink id="category">
            Category
          </InputLabel>
          <Select
            labelId="category-select"
            id="category-select"
            value={category}
            onChange={handleCategory}
            className={classes.selectEmpty}
          >
            <MenuItem value="">Any</MenuItem>

            {categories.map((categorie, index) => (
              <MenuItem key={index} value={categorie}>
                {capitalize(categorie)}
              </MenuItem>
            ))}
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
        <Button
          className={classes.button}
          onClick={() => cleanResults()}
          variant="contained"
          color="primary"
        >
          Clean results
        </Button>
      </form>

      <div>
        {factData.length > 0 ? (
          <div>Showing {factData.length} results </div>
        ) : null}
        <div>
          {factData.map((factItem, index) => (
            <Fact key={index} fact={factItem.value} />
          ))}
        </div>
      </div>
    </div>
  );
}

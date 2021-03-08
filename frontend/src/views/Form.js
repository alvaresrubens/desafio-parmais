import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Fact from "./Fact";

const useStyles = makeStyles({
  container: {
    margin: "7%",
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Mulish",
    textAlign: "center",
    fontSize: "12px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
  },

  inputsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "30px",
    flexWrap: "wrap",
  },

  inputField: {
    fontFamily: "Mulish",
    width: "296px",
    textAlign: "left",
    marginLeft: "15px",

    "& .MuiFormLabel-root": {
      fontFamily: "Mulish",
    },
  },

  item: {
    fontFamily: "Mulish",
    "&:hover": {
      background: "#DAF1F2",
    },
  },

  inputLabel: {
    fontFamily: "Mulish",
    color: "#48CCCC",
    fontSize: "13px",
    marginLeft: "15px",
  },

  button: {
    marginTop: "30px",
    marginBottom: "30px",
    height: "40px",
    left: "0px",
    right: "0px",
    color: "#20232D",
    fontFamily: "Mulish",
    margin: "0 auto",

    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "20px",
    textTransform: "none",

    width: "245px",
    background: "#25EFA1",
    boxShadow: "0px 3px 5px rgba(0, 204, 126, 0.25)",

    "&:hover": {
      background: "#1dbf80",
    },
  },
  visible: {
    visibility: "visible",
  },
  hidden: {
    visibility: "hidden",
  },
});
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

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  // eslint-disable-next-line
  useEffect(() => loadCategories(), []);
  return (
    <div className={classes.container}>
      <form className={classes.form} noValidate>
        <div className={classes.inputsContainer}>
          <FormControl>
            <TextField
              className={classes.inputField}
              value={freeText}
              onChange={handleFreeText}
              id="search"
              label="Search"
            />
          </FormControl>

          <FormControl>
            <InputLabel
              shrink
              className={(classes.inputField, classes.inputLabel)}
              id="category"
            >
              Category
            </InputLabel>
            <Select
              labelId="category-select"
              id="category-select"
              className={classes.inputField}
              value={category}
              onChange={handleCategory}
            >
              <MenuItem
                className={(classes.inputField, classes.item)}
                value="
              "
              >
                Any
              </MenuItem>

              {categories.map((categorie, index) => (
                <MenuItem
                  className={(classes.inputField, classes.item)}
                  key={index}
                  value={categorie}
                >
                  {capitalize(categorie)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className={factData.length > 1 ? classes.visible : classes.hidden}>
          Showing {factData.length} results{" "}
        </div>
        <Button
          className={classes.button}
          onClick={() => searchFacts()}
          variant="contained"
          color="primary"
        >
          Get a new random fact!
        </Button>
      </form>

      <div>
        {factData.map((factItem, index) => (
          <Fact key={index} fact={factItem.value} />
        ))}
      </div>
    </div>
  );
}

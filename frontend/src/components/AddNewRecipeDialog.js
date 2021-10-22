import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { TextField, Typography } from "@material-ui/core";
import recipeservice from "../services/recipeservice";
import authService from "../services/authservice";
import { useHistory } from "react-router";

const AddNewRecipeDialog = ({ openDialog, toggleModal }) => {
  const history = useHistory();
  const [category, setCategory] = useState("");
  const [mainIngredient, setMainIngredient] = useState("");
  const [mealType, setMealType] = useState("");
  const [keywords, setKeywords] = useState("");
  const [instructions, setInstructions] = useState([{ Instruction: "" }]);
  const [ingredients, setIngredients] = useState([
    { Qty: "", Unit: "", Ingredient: "" },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeMainIngredient = (event) => {
    setMainIngredient(event.target.value);
  };
  const handleChangeMealType = (event) => {
    setMealType(event.target.value);
  };
  const saveKeywords = (event) => {
    setKeywords(event.target.value);
  };

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);

    if (event.target.value == "Drink") {
      setMainIngredient("");
      setMealType("");
    }
  };

  const addRecipe = () => {
    const getUser = authService.getCurrentUser();
    delete getUser.password;
    const myRecipe = {
      title: title,
      description: description,
      cooking_time: "",
      servings: "",
      ingredients: ingredients,
      instructions: instructions,
      main_ingredient: mainIngredient,
      main_category: category,
      meal_type: mealType,
      keywords: keywords,
      user: getUser,
    };

    recipeservice.postNewRecipe(myRecipe);
    console.log(myRecipe);
    toggleModal(false);
    history.push("/" + getUser.id);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={openDialog}
        /*
                Would need to be modified to detect if click occured in our out of the actual dialog.
                I don't think it's necessary to have this alternate way of closing the dialog anyway.
                
                onClick={() => toggleModal(false)}
                */
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="recipe-dialog"
      >
        <DialogContent class="recipeDialogContent">
          <div class="newRecipeContainer">
            <DialogTitle class="newRecipeTitle" id="alert-dialog-title">
              <TextField
                onChange={saveTitle}
                value={title}
                id="outlined-basic"
                label="Recipe Title"
                variant="outlined"
              />
              <IconButton onClick={() => toggleModal(false)} color="primary">
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContentText class="newRecipeSlides">
              <MyDropzone />
            </DialogContentText>

            <DialogContentText class="newRecipeSpecs">
              <FormControl component="fieldset">
                <FormLabel component="legend">Main Category</FormLabel>
                <RadioGroup
                  class="newRecipeSpecs1"
                  aria-label="Main Category"
                  name="fooDrink"
                  value={category}
                  onChange={handleChangeCategory}
                >
                  <FormControlLabel
                    value="Food"
                    control={<Radio />}
                    label="Food"
                  />
                  <FormControlLabel
                    value="Drink"
                    control={<Radio />}
                    label="Drink"
                  />
                </RadioGroup>
                <FormLabel component="legend">Main Ingredient</FormLabel>
                <RadioGroup
                  class="newRecipeSpecs2"
                  aria-label="Main Ingredient"
                  name="ingredient"
                  value={mainIngredient}
                  onChange={handleChangeMainIngredient}
                >
                  <FormControlLabel
                    value="Vegetarian"
                    control={<Radio disabled={category == "Drink"} />}
                    label="Vegetarian"
                  />
                  <FormControlLabel
                    value="Meat"
                    control={<Radio disabled={category == "Drink"} />}
                    label="Meat"
                  />
                </RadioGroup>
                <FormLabel component="legend">Type of meal</FormLabel>
                <RadioGroup
                  class="newRecipeSpecs3"
                  aria-label="Type of meal"
                  name="mealType"
                  value={mealType}
                  onChange={handleChangeMealType}
                >
                  <FormControlLabel
                    value="Appetizer"
                    control={<Radio disabled={category == "Drink"} />}
                    label="Appetizer"
                  />
                  <FormControlLabel
                    value="Meal"
                    control={<Radio disabled={category == "Drink"} />}
                    label="Meal"
                  />
                  <FormControlLabel
                    value="Dessert"
                    control={<Radio disabled={category == "Drink"} />}
                    label="Dessert"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContentText>

            <DialogContentText class="newRecipeKeywords">
              Keywords:
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Input keywords separated by commas ( , )"
                variant="outlined"
                value={keywords}
                onChange={saveKeywords}
              />
            </DialogContentText>

            <DialogContentText class="newRecipeInstructions">
              <Typography variant="h5">Instructions:</Typography>
              <InstructionStep setInstructions={setInstructions} />
            </DialogContentText>

            <DialogContentText class="newRecipeDescription">
              <Typography variant="h5">Description:</Typography>
              <TextField
                id="outlined-basic"
                label="Describe the recipe"
                variant="outlined"
                value={description}
                onChange={saveDescription}
              />
            </DialogContentText>

            <DialogContentText class="newRecipeIngredients">
              <Typography variant="h5">Ingredients:</Typography>
              <br />
              <IngredientList setIngredients={setIngredients} />
            </DialogContentText>

            <DialogActions class="newRecipeAdd">
              <Button
                color="primary"
                autoFocus
                variant="outlined"
                onClick={addRecipe}
              >
                Add recipe
              </Button>
            </DialogActions>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const IngredientList = (props) => {
  const [formValues, setFormValues] = useState([
    { Qty: "", Unit: "", Ingredient: "" },
  ]);

  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    props.setIngredients(formValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { Qty: "", Unit: "", Ingredient: "" }]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <FormControl required>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Qty</label>
          <TextField
            variant="outlined"
            size="small"
            name="Qty"
            onChange={(e) => handleChange(index, e)}
          />
          <label>Unit</label>
          <TextField
            variant="outlined"
            size="small"
            name="Unit"
            onChange={(e) => handleChange(index, e)}
          />
          <label>Ingredient</label>
          <TextField
            variant="outlined"
            size="small"
            name="Ingredient"
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <IconButton
              onClick={() => removeFormFields(index)}
              color="secondary"
            >
              <Close />
            </IconButton>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <Button onClick={() => addFormFields()}>Add new ingredient</Button>
      </div>
    </FormControl>
  );
};

const InstructionStep = (props) => {
  const [formValues, setFormValues] = useState([{ Instruction: "" }]);

  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    props.setInstructions(formValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { Instruction: "" }]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <FormControl required>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>{index + 1}.</label>
          <TextField
            variant="outlined"
            size="medium"
            name="Instruction"
            fullWidth
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <IconButton
              onClick={() => removeFormFields(index)}
              color="secondary"
            >
              <Close />
            </IconButton>
          ) : null}
        </div>
      ))}
      <div className="button-section">
        <Button onClick={() => addFormFields()}>Add new step</Button>
      </div>
    </FormControl>
  );
};

const MyDropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the files here ...</Typography>
      ) : (
        <Typography>
          Drag 'n' drop some files here, or click to select files
        </Typography>
      )}
    </div>
  );
};

export default AddNewRecipeDialog;

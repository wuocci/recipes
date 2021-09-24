import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { TextField, Typography } from '@material-ui/core';


const RecipeDialog = ({ openDialog, toggleModal }) => {
    const [value1, setValue1] = useState('food');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    
    const handleChange1 = (event) => {
        setValue1(event.target.value);
    };
    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };
    const handleChange3 = (event) => {
        setValue3(event.target.value);
    };
    return (
        <div>
            <Dialog
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
                    <div class="recipeContainer">
                        <DialogTitle class="recipeTitle" id="alert-dialog-title">
                            {"Recipe name by user user"}
                            <IconButton onClick={() => toggleModal(false)} color="primary" >
                                <Close />
                            </IconButton>
                        </DialogTitle>

                        <DialogContentText class="recipeSlides">
                            <MyDropzone />
                        </DialogContentText>

                        <DialogContentText class="recipeSpecs">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    Main Category
                                </FormLabel>
                                <RadioGroup class="newRecipeSpecs1" aria-label="Main Category" name="fooDrink" value={value1} onChange={handleChange1}>
                                    <FormControlLabel value="Food" control={<Radio />} label="Food" />
                                    <FormControlLabel value="Drink" control={<Radio />} label="Drink" />
                                </RadioGroup>
                                <FormLabel component="legend">
                                    Main Ingredient
                                </FormLabel>
                                <RadioGroup class="newRecipeSpecs2" aria-label="Main Ingredient" name="ingredient" value={value2} onChange={handleChange2}>
                                    <FormControlLabel value="Vegetarian" control={<Radio />} label="Vegetarian" />
                                    <FormControlLabel value="Meat" control={<Radio />} label="Meat" />
                                </RadioGroup>
                                <FormLabel component="legend">
                                    Type of meal
                                </FormLabel>
                                <RadioGroup class="newRecipeSpecs3" aria-label="Type of meal" name="mealType" value={value3} onChange={handleChange3}>
                                    <FormControlLabel value="Appetizer" control={<Radio />} label="Appetizer" />
                                    <FormControlLabel value="Meal" control={<Radio />} label="Meal" />
                                    <FormControlLabel value="Dessert" control={<Radio />} label="Dessert" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContentText>

                        <DialogContentText class="recipeInstructions">
                            Instructions:
                            <InstructionStep />
                        </DialogContentText>

                        <DialogContentText class="recipeIngredients">
                            <Typography variant="h5">
                                Ingredients:
                            </Typography>
                            <br />
                            <IngredientList />
                        </DialogContentText>

                        <DialogActions class="recipeFavorite" >
                            <Button color="primary" autoFocus>
                                Add recipe
                            </Button>
                        </DialogActions>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

const IngredientList = () => {
    const [formValues, setFormValues] = useState([{ Qty: "", Unit: "", Ingredient: "" }])

    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { Qty: "", Unit: "", Ingredient: "" }])
    }

    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    return (
        <FormControl>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label>Qty</label>
                    <TextField name="Qty" onChange={e => handleChange(index, e)} />
                    <label>Unit</label>
                    <TextField name="Unit" onChange={e => handleChange(index, e)} />
                    <label>Ingredient</label>
                    <TextField name="Ingredient" onChange={e => handleChange(index, e)} />
                    {
                        index ?
                            <IconButton onClick={() => removeFormFields(index)} color="primary" >
                                <Close />
                            </IconButton>
                            : null
                    }
                </div>
            ))}
            <div className="button-section">
                <Button onClick={() => addFormFields()}>Add new ingredient</Button>
            </div>
        </FormControl>
    )
}

const InstructionStep = () => {
    const [formValues, setFormValues] = useState([{ Instruction: "" }])

    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.Instruction] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFormFields = () => {
        setFormValues([...formValues, { Instruction: "" }])
    }

    const removeFormFields = (i) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    return (
        <FormControl>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <label>{index + 1}. </label>
                    <TextField name="Instruction" onChange={e => handleChange(index, e)} />
                    {
                        index ?
                            <IconButton onClick={() => removeFormFields(index)} color="primary" >
                                <Close />
                            </IconButton>
                            : null
                    }
                </div>
            ))}
            <div className="button-section">
                <Button onClick={() => addFormFields()}>Add new step</Button>
            </div>
        </FormControl>
    )
}

const MyDropzone = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default RecipeDialog;
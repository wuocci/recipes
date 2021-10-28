import React, { useRef, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import recipeservice from "../services/recipeservice";
import CircularProgress from "@mui/material/CircularProgress";

/*
const SearchBar = () => {

    const top10recipes = [
        { title: 'Margarita' },
        { title: 'Ramen' }
    ]
    
    return (
    <div className="search-bar">
        <Autocomplete
            className='SearchBar'
            freeSolo
            options={top10recipes.map(option => option.title)}
            renderInput={params => (
                <TextField {...params} label="Search recipes..." margin="normal" variant="outlined" type="search" 
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
            )}
        />
        <SearchButton />
        <AdvancedSearch />
    </div>
    );
}
*/

const SearchBar = () => {
    const [recipes, setRecipes] = useState(null);
    //fetch recipes from mongodb
    useEffect(() => {
        recipeservice
            .getAll()
            .then((data) => setRecipes(data))
            .catch((error) => {
                throw error;
            });
    }, []);
    
  //add loader until recipes are fetched
  if (recipes === null) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
    } else {
        return(
            <div className="search-bar">

                <SearchButton />
                <AdvancedSearch />
            </div>
        )
    }
}

const SearchButton = () => {
    return (
        <div className="search-button">
            <Button color="inherit">Search</Button>
        </div>
    );
}

const AdvancedSearch = () => {
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [value1, setValue1] = useState('');
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

    if (!advancedSearch) {
        return (
            <div className="advanced-search-closed">
                <Button className="AdvancedSearchButtonClosed" onClick={() => setAdvancedSearch(!advancedSearch)}
                    color="inherit"
                    endIcon={<ArrowDropDownIcon>send</ArrowDropDownIcon>}
                >
                    Advanced Search
                </Button>
            </div>
        );
    } else {
        return (
            <div className="advanced-search-open">
                <Button onClick={() => setAdvancedSearch(!advancedSearch)}
                    color="inherit"
                    endIcon={<ArrowDropUpIcon>send</ArrowDropUpIcon>}
                >
                    Advanced Search
                </Button>
                <div className="advanced-open-filters">
                    <Typography component="div" variant="body1">
                        <Box display="flex" flexDirection="row">
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Main Category</FormLabel>
                                <RadioGroup aria-label="Main Category" name="fooDrink" value={value1} onChange={handleChange1}>
                                    <FormControlLabel value="Food" control={<Radio />} label="Food" />
                                    <FormControlLabel value="Drink" control={<Radio />} label="Drink" />
                                </RadioGroup>
                                <FormLabel component="legend">Main Ingredient</FormLabel>
                                <RadioGroup aria-label="Main Ingredient" name="ingredient" value={value2} onChange={handleChange2}>
                                    <FormControlLabel value="Vegetarian" control={<Radio />} label="Vegetarian" />
                                    <FormControlLabel value="Meat" control={<Radio />} label="Meat" />
                                </RadioGroup>
                                <FormLabel component="legend">Type of meal</FormLabel>
                                <RadioGroup aria-label="Type of meal" name="mealType" value={value3} onChange={handleChange3}>
                                    <FormControlLabel value="Appetizer" control={<Radio />} label="Appetizer" />
                                    <FormControlLabel value="Meal" control={<Radio />} label="Meal" />
                                    <FormControlLabel value="Dessert" control={<Radio />} label="Dessert" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Typography>
                </div>
            </div>
        )
    }
}

export default SearchBar;
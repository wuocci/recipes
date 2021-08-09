import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { flexbox } from '@material-ui/system';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const SearchBar = () => {

    return (<div style={{ width: 300 }}>
        <Autocomplete
            className='SearchBar'
            freeSolo
            options={top10recipes.map(option => option.title)}
            renderInput={params => (
                <TextField {...params} label="Search bar" margin="normal" variant="outlined" />
            )}
        />
        <SearchButton />
        <AdvancedSearch />
    </div>
    );
}

const SearchButton = () => {
    return (
        <div className="SearchButtonDiv">
            <Button className="SearchButton" color="inherit">Search</Button>
        </div>
    );
}

const AdvancedSearch = () => {
    const [advancedSearch, setAdvancedSearch] = useState(false);
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

    if (!advancedSearch) {
        return (
            <div className="AdvancedSearchDivClosed">
                <Button className="AdvancedSearchButtonClosed" onClick={() => setAdvancedSearch(!advancedSearch)} color="inherit">
                    Advanced Search
                </Button>
            </div>
        );
    } else {
        return (
            <div className="AdvancedSearchDivOpen">
                <Button className="AdvancedSearchButtonOpen" onClick={() => setAdvancedSearch(!advancedSearch)} color="inherit">
                    Advanced Search
                </Button>
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
        )
    }
}

const top10recipes = [
    { title: 'Margarita' },
    { title: 'Ramen' }
]

export default SearchBar;
/* eslint-disable no-use-before-define */
import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const SearchBar = () => {
    return (<div style={{ width: 300 }}>
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={top10recipes.map(option => option.title)}
            renderInput={params => (
                <TextField {...params} label="Search bar" margin="normal" variant="outlined" />
            )}
        />
    </div>
    );
}

const top10recipes = [
    { title: 'Margarita' },
    { title: 'Ramen' }
]

export default SearchBar;
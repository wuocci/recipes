import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const top10recipes = [
    { title: 'Margarita' },
    { title: 'Ramen' }
]

const SearchButton = () => {
    return (
        <div className="SearchButtonDiv">
            <Button className="SearchButton" color="inherit">Search</Button>
        </div>
    );
}

const AdvancedSearch = () => {
    const [advancedSearch, setAdvancedSearch] = useState(false);
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
            </div>
        )
    }
}

export default SearchBar;
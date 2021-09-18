import ButtonAppBar from '../../components/appBar/ButtonAppBar.js';
import SearchBar from '../../components/SearchBar.js';
import RecipeGrid from '../../components/RecipeGrid.js';
import { Divider } from '@material-ui/core';

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar />
            <SearchBar />
            <Divider/>
            <RecipeGrid/>
        </div>
    );
}

export default FrontPage;
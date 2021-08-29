import ButtonAppBar from '../../components/appBar/AppBar.js';
import SearchBar from '../../components/SearchBar.js';
import RecipeGrid from '../../components/RecipeGrid.js';
import { Divider } from '@material-ui/core';

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar isProfilePage={false} />
            <SearchBar />
            <Divider/>
            <RecipeGrid/>
        </div>
    );
}

export default FrontPage;
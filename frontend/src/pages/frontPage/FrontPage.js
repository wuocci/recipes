import ButtonAppBar from '../../components/appBar/AppBar.js';
import SearchBar from '../../components/SearchBar.js';
import RecipeGrid from '../../components/RecipeGrid.js';

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar isProfilePage={false} />
            <SearchBar />
            <RecipeGrid/>
        </div>
    );
}

export default FrontPage;
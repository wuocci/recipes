import ButtonAppBar from '../../components/appBar/AppBar.js';
import SearchBar from '../../components/SearchBar.js';
import RecipeDialog from '../../components/RecipeDialog.js'

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar isProfilePage={false} />
            <SearchBar />
            <RecipeDialog/>
        </div>
    );
}

export default FrontPage;
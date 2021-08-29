import ButtonAppBar from '../../components/appBar/AppBar.js';
import SearchBar from '../../components/SearchBar.js';
import RecipeGrid from '../../components/RecipeGrid.js';
<<<<<<< HEAD
=======
import { Divider } from '@material-ui/core';
>>>>>>> c870df0916fff3bfff5a8152c736df6c2657e320

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar isProfilePage={false} />
            <SearchBar />
<<<<<<< HEAD
=======
            <Divider/>
>>>>>>> c870df0916fff3bfff5a8152c736df6c2657e320
            <RecipeGrid/>
        </div>
    );
}

export default FrontPage;
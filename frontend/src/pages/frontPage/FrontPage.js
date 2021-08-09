import ButtonAppBar from '../../components/appBar/AppBar.js';
import SearchBar from '../../components/SearchBar.js';

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar isProfilePage={false} />
            <SearchBar />
        </div>
    );
}

export default FrontPage;
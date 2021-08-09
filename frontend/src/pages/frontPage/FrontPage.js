import ButtonAppBar from '../../components/appBar/AppBar.js';
import logo from '../../img/logoRecipeBox.svg'

const FrontPage = () => {
    return (
        <div className="FrontPage">
            <ButtonAppBar isProfilePage={false} />
        </div>
    );
}

export default FrontPage;
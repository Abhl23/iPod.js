import Menu from './Menu';
import Coverflow from './CoverflowScreen';
import GamesScreen from './GamesScreen';
import SettingsScreen from './SettingsScreen';

const Screen = (props) => {

    const {menuItems, activeMenuItem, isCoverflowVisible, isGamesVisible, isSettingsVisible}=props;

    return (
        <div id="main-screen">
            <Menu
                menuItems={menuItems}
                activeMenuItem={activeMenuItem}
            />
            {isCoverflowVisible? <Coverflow /> : ''}
            {isGamesVisible? <GamesScreen /> : ''}
            {isSettingsVisible? <SettingsScreen /> : ''}
        </div>
    );
}

export default Screen;
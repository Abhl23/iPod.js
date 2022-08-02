import Menu from './Menu';
import Coverflow from './CoverflowScreen';
import GamesScreen from './GamesScreen';
import SettingsScreen from './SettingsScreen';
import MusicPlayer from './MusicPlayer';

const Screen = (props) => {

    const {menuItems, 
           activeMenuItem, 
           isCoverflowVisible, 
           isGamesVisible, 
           isSettingsVisible, 
           isMusicPlayerVisible,
           isMusicPlaying,
           isAutoPlayDone}=props;

    return (
        <div id="main-screen">
            <Menu
                menuItems={menuItems}
                activeMenuItem={activeMenuItem}
                isMusicPlaying={isMusicPlaying}
                isAutoPlayDone={isAutoPlayDone}
            />
            {isCoverflowVisible? <Coverflow isMusicPlaying={isMusicPlaying} isAutoPlayDone={isAutoPlayDone} /> : ''}
            {isGamesVisible? <GamesScreen isMusicPlaying={isMusicPlaying} isAutoPlayDone={isAutoPlayDone} /> : ''}
            {isSettingsVisible? <SettingsScreen isMusicPlaying={isMusicPlaying} isAutoPlayDone={isAutoPlayDone} /> : ''}
            <MusicPlayer
                isMusicPlayerVisible={isMusicPlayerVisible} 
                isMusicPlaying={isMusicPlaying} 
                isAutoPlayDone={isAutoPlayDone} 
            />
        </div>
    );
}

export default Screen;
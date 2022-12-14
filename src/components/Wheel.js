import menu from '../assets/menu.svg';
import fastforward from '../assets/fast_forward.svg';
import rewind from '../assets/rewind.svg';
import playpause from '../assets/play_pause.svg';

import '../assets/css/Wheel.css';

const Wheel = (props) => {

    const {onMenuButtonClick, onCentreButtonClick, onPlayPause}=props;

    return (
        <div id="wheel-container">
            <div id="wheel">
                <img id="menu-button" src={menu} alt="menu" onClick={onMenuButtonClick} />
                <img id="fast-forward-button" src={fastforward} alt="fast-forward" />
                <img id="rewind-button" src={rewind} alt="rewind" />
                <img id="play-pause-button" src={playpause} alt="play-pause" onClick={onPlayPause} />
            </div>
            <div id="centre-button" onClick={onCentreButtonClick}></div>
        </div>
    );
}

export default Wheel;
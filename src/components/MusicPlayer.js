import battery from '../assets/battery.svg';

import '../assets/css/MusicPlayer.css';

const MusicPlayer = (props) => {

    const {isMusicPlayerVisible, isMusicPlaying, isAutoPlayDone}=props;

    return (
        // hides or display the MusicPlayer
        <div id="music-player" className={isMusicPlayerVisible? '' : 'hidden'}>
            <div id="status-bar">
                <span>iPod.js</span>
                <div>
                    {/* displays the song status on the status bar */}
                    {isAutoPlayDone && (isMusicPlaying? <span><i className="fa-solid fa-music"></i></span> : <span><i className="fa-solid fa-pause"></i></span>)}
                    <span><img src={battery} alt="battery" style={{width : 30}} /></span>
                </div>
            </div>
            <main>
                <div id="song-content">
                    <div id="song-cover"></div>
                    <div id="song-desc">
                        <h3 id="song-name">The Ride</h3>
                        <p style={{marginLeft : 1}}>Drake</p>
                        <p>Take Care</p>
                    </div>
                </div>
                <div id="song-status">
                    <span id="song-timestamp">0:00</span>
                    <div id="song-bar">
                        <div id="inner-bar"></div>
                    </div>
                    <span>5:51</span>
                </div>
            </main>
        </div>
    );
}

export default MusicPlayer;
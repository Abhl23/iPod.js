import battery from '../assets/battery.svg';

const GamesScreen = (props) => {

    const {isMusicPlaying, isAutoPlayDone}=props;

    return (
        <div id="games-screen">
            <div id="status-bar">
                <span>iPod.js</span>
                <div>
                    {isAutoPlayDone && (isMusicPlaying? <span><i className="fa-solid fa-music"></i></span> : <span><i className="fa-solid fa-pause"></i></span>)}
                    <span><img src={battery} alt="battery" style={{width : 30}} /></span>
                </div>
            </div>
            <main>
                <img src="https://cdn-icons-png.flaticon.com/512/2946/2946177.png" alt="games" />
                <h2>Games</h2>
            </main>
        </div>
    );
}

export default GamesScreen;
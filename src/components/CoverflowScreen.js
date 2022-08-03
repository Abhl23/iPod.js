import battery from '../assets/battery.svg';

const Coverflow = (props) => {

    const {isMusicPlaying, isAutoPlayDone}=props;

    return (
        <div id="coverflow">
            <div id="status-bar">
                <span>iPod.js</span>
                <div>
                    {/* displays the song status on the status bar */}
                    {isAutoPlayDone && (isMusicPlaying? <span><i className="fa-solid fa-music"></i></span> : <span><i className="fa-solid fa-pause"></i></span>)}
                    <span><img src={battery} alt="battery" style={{width : 30}} /></span>
                </div>
            </div>
            <main>
                <h2>Coverflow</h2>
            </main>
        </div>
    );
}

export default Coverflow;
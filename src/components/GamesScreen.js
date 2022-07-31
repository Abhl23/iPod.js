import battery from '../assets/battery.svg';

const GamesScreen = (props) => {
    return (
        <div id="games-screen">
            <div id="status-bar">
                <span>iPod.js</span>
                <span><img src={battery} alt="battery" style={{width : 30}} /></span>
            </div>
            <main>
                <img src="https://cdn-icons-png.flaticon.com/512/2946/2946177.png" alt="games" />
                <h2>Games</h2>
            </main>
        </div>
    );
}

export default GamesScreen;
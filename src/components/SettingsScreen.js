import battery from '../assets/battery.svg';

const SettingsScreen = (props) => {
    return (
        <div id="settings-screen">
            <div id="status-bar">
                <span>iPod.js</span>
                <span><img src={battery} alt="battery" style={{width : 30}} /></span>
            </div>
            <main>
                <img src="https://cdn-icons-png.flaticon.com/512/3953/3953226.png" alt="settings" />
                <h2>Settings</h2>
            </main>
        </div>
    );
}

export default SettingsScreen;
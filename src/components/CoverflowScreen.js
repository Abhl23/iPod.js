import battery from '../assets/battery.svg';

const Coverflow = (props) => {
    return (
        <div id="coverflow">
            <div id="status-bar">
                <span>iPod.js</span>
                <span><img src={battery} alt="battery" style={{width : 30}} /></span>
            </div>
            <main>
                <h2>Coverflow</h2>
            </main>
        </div>
    );
}

export default Coverflow;
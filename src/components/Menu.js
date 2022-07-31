import battery from '../assets/battery.svg';

import MenuItem from './MenuItem';

const Menu = (props) => {

    const {menuItems, activeMenuItem}=props;

    return (
        <div id="side-menu">
            <div id="status-bar">
                <span>iPod.js</span>
                <span><img src={battery} alt="battery" style={{width : 30}} /></span>
            </div>
            <div id="menu-list">
                {menuItems.map((item, i) => {
                    return (
                        <MenuItem
                            activeMenuItem={activeMenuItem===i? true : false}
                            itemName={item}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Menu;
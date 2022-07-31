import Menu from './Menu';

const Screen = (props) => {

    const {menuItems, activeMenuItem}=props;

    return (
        <div id="main-screen">
            <Menu
                menuItems={menuItems}
                activeMenuItem={activeMenuItem}
            />
        </div>
    );
}

export default Screen;
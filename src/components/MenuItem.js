import '../assets/css/MenuItem.css';

const MenuItem = (props) => {

    const {itemName, activeMenuItem}=props;

    return (
        // highlights the menuItem if it is active
        <div className={activeMenuItem? "menu-item active" : "menu-item"}>
                <span>{itemName}</span>
                <span><i style={activeMenuItem? {} : {display : 'none'}} className="fa-solid fa-angle-right"></i></span>  
        </div>
    );
}

export default MenuItem;
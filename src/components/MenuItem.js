const MenuItem = (props) => {

    const {itemName, activeMenuItem}=props;

    return (
        <div className={activeMenuItem? "menu-item active" : "menu-item"}>
                <span>{itemName}</span>
                <span><i style={activeMenuItem? {} : {display : 'none'}} className="fa-solid fa-angle-right"></i></span>  
        </div>
    );
}

export default MenuItem;
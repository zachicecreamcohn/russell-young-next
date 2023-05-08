import React from "react";
import { Logout } from "tabler-icons-react";

import styles from "./Menu.module.css";

function Menu(props) {
    const menuItems = props.menuItems;
    const activeMenuItem = props.activeMenuItem;
    const setActiveMenuItem = props.setActiveMenuItem;

    return (
        <div className={styles.menu}>
            <div>
            {menuItems.map((menuItem, index) => {
                return (
                    <div key={index} className={activeMenuItem === menuItem ? styles.active+ " " +styles.item: styles.item}>
                        <p
                         onClick={() => setActiveMenuItem(menuItem)}
                        >{menuItem.toUpperCase()}</p>
                    </div>
                )
            }
            )}
            <div className={styles['logout-btn'] + " " +styles['menu-item']}>
                <p>LOGOUT</p>
                <Logout size={22}
                 />

            </div>
            </div>
            
        </div>

    );


}


export default Menu;
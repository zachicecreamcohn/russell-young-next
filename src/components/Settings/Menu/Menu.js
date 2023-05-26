import React from "react";
import { useEffect, useState } from "react";
import { Logout } from "tabler-icons-react";
import { logout, User } from "@/common/util/auth";

import styles from "./Menu.module.css";

function Menu(props) {
    const menuItems = props.menuItems;
    const activeMenuItem = props.activeMenuItem;
    const setActiveMenuItem = props.setActiveMenuItem;
    const [user, setUser] = useState(null);


    useEffect(() => {
        async function fetchUser() {
            const user = new User();
            await user.fetchUser();
            console.log(user.username);
            const userData = {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                company: user.company,
            }

            setUser(userData);
        }

        fetchUser();
    }, []);

    

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
            <div className={styles["user-section"]}>
                <div className={styles['logout-btn'] + " " +styles['menu-item']}
                            onClick={() => logout()}
                            >
                <p>LOGOUT</p>
                <Logout size={22}
                 />

            </div>
            {user &&
            <p className={styles.user}>USER: {user.username.toUpperCase()}</p>
            }

            </div>
            
            </div>
            
        </div>

    );


}


export default Menu;
import React, { useEffect, useState } from "react";
import { Logout } from "tabler-icons-react";
import { logout, User } from "@/common/util/auth";

import styles from "./Menu.module.css";

function Menu(props) {
  const menuItems = props.menuItems;
  const activeMenuItem = props.activeMenuItem;
  const setActiveMenuItem = props.setActiveMenuItem;
  const direction = props.direction || "column";
  const wide = props.wide || false;
  const [user, setUser] = useState(null);
  const sticky = props.sticky || false;
  const [menuPosition, setMenuPosition] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const rightContent = props.rightContent || null;
  const [showUserFunctions, setShowUserFunctions] = useState(props.showUserFunctions);

  useEffect(() => {
    async function fetchUser() {
      const user = new User();
      await user.fetchUser();
      const userData = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
      };

      setUser(userData);
    }

    if (showUserFunctions) {
      fetchUser();
    }
  }, []);

  function handleScroll() {
        
    const menu = document.querySelector(`.${styles.container}`);
    if (menuHeight === 0) {
        setMenuHeight(menu.offsetHeight);
    }
    if (menu) {
      if (window.pageYOffset > menuPosition + menuHeight) {
        menu.classList.add(styles.stuck);
      } else {
        menu.classList.remove(styles.stuck);
      }
    }
  }

  useEffect(() => {
    if (sticky) {
      const menu = document.querySelector(`.${styles.container}`);
      const menuPosition = menu.offsetTop;
      setMenuPosition(menuPosition);
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={styles.container + " " + styles[direction] + " " + (wide ? styles.wide : "") + " " + (sticky ? styles.sticky : "") + " " + (rightContent ? styles['has-right-content'] : "")}>
      {props.title && (
        <>
          <p className={styles.title}>{props.title.toUpperCase()}</p>
          <span className={styles.divider}></span>
        </>
      )}
        <div className={styles.left}>
      <div className={styles.menu}>
       
        
        {menuItems.map((menuItem, index) => {
          return (
            <div key={index} className={activeMenuItem === menuItem ? styles.active + " " + styles.item : styles.item}>
              <p onClick={() => setActiveMenuItem(menuItem)}>{menuItem.toUpperCase()}</p>
            </div>
          );
        })}
        {showUserFunctions && (
          <div className={styles["user-section"]}>
            <div className={styles["logout-btn"] + " " + styles["menu-item"]} onClick={() => logout()}>
              <p>LOGOUT</p>
              <Logout size={22} />
            </div>
            {user && <p className={styles.user}>USER: {user.username.toUpperCase()}</p>}
          </div>
        )}
      </div>
      </div>
      { rightContent && (
        <div className={styles.right}>
            {rightContent}
        </div>
      )}
    </div>
  );
}

export default Menu;

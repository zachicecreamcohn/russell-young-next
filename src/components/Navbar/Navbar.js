// import react
import React from "react";

// import css
import styles from './Navbar.module.css';




let links = [
    // {
    //     name: "LOGIN",
    //     url: "/login"
    // },
    // {
    //     name: "REGISTER",
    //     url: "/register"
    // },


]
// this is the navbar component that will be used on every page

function Navbar() {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <a href="/" className={styles.active}>RUSSELL YOUNG</a>
        </div>
        <div className={styles.links}>
            {/* for each link, check if it the current url. If it is, display with class "active" */}
            {links.map((link, index) => {
                return (

                    <a href={link.url} key={index} className={window.location.pathname === link.url ? "active" : ""}>{link.name}</a>
                )
            })}

        </div>
    </div>
  );
}

export default Navbar;
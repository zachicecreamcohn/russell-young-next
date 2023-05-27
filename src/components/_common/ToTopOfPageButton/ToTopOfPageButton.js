import React, { useEffect, useState } from "react";
import { ArrowUp } from "tabler-icons-react";
import styles from "./ToTopOfPageButton.module.css";

function ToTopOfPageButton() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // set the scroll position threshold here
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles['to-top-of-page-button']} ${isHidden ? styles.hidden : ""}`} onClick={handleClick}>
      <ArrowUp size={28} />
    </div>
  );
}

export default ToTopOfPageButton;

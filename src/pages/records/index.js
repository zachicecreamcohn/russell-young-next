import Body from "@/components/_common/Body/Body"
import { checkLogin } from "@/common/util/auth"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";
import Menu from "@/components/_common/Menu/Menu";
import Consignment from "@/components/records/Consignment/Consignment";
import Inventory from "@/components/records/Inventory/Inventory";
import styles from "./Records.module.css";

function Records() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState("CONSIGNMENT");


  useEffect(() => {
    checkLogin()
      .then((loggedIn) => {
        if (!loggedIn && window.location.pathname !== "/login") {
          window.location.href = "/login";
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!isLoggedIn) {
    return (
      <Body center>
<CircularProgress
          sx={{
            color: "#000000",
          }}
        />      </Body>
    );
  }

    return (
        <Body
    center
    direction="column"
    Tabs={true}
    activeTab="records"
    >


      <div className={styles.container}>
        <div className={styles.left}>
<Menu
        title="Records"
        menuItems={["CONSIGNMENT", "INVENTORY"]}
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        showUserFunctions={false}
      />
      </div>
      <div className={styles.right}>
        {activeMenuItem === "CONSIGNMENT" && <Consignment />}
        {activeMenuItem === "INVENTORY" && <Inventory />}
        </div>
      </div>

    </Body>
    )
}

export default Records
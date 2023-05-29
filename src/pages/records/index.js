import Body from "@/components/_common/Body/Body";
import { checkLogin } from "@/common/util/auth";
import { useEffect, useState } from "react";
import { CircularProgress, useMediaQuery } from "@mui/material";
import Menu from "@/components/_common/Menu/Menu";
import Consignment from "@/components/records/Consignment/Consignment";
import Inventory from "@/components/records/Inventory/Inventory";
import styles from "./Records.module.css";
import toast, { Toaster } from "react-hot-toast";
function Records() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("CONSIGNMENT");
  const [menuRightContent, setMenuRightContent] = useState(null);

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

  function alertError(message) {
    toast.error(message, {
      style: {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
      },
      position: "top-center",
    });
  }

  function alertSuccess(message) {
    toast.success(message, {
      style: {
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
      },
      position: "top-center",
    });
  }





  if (!isLoggedIn) {
    return (
      <Body center>
        <CircularProgress
          sx={{
            color: "#000000",
          }}
        />{" "}
      </Body>
    );
  }


  return (
    <Body center direction="column" Tabs={true} activeTab="records">
      <Menu
            menuItems={["CONSIGNMENT", "INVENTORY"]}
            activeMenuItem={activeMenuItem}
            setActiveMenuItem={setActiveMenuItem}
            showUserFunctions={false}
            sticky={true}
            wide={true}
            rightContent={
              <div className={styles.rightContent}>
                {menuRightContent}
              </div>
            }

          />
      <div className={styles.container}>
        
          

          {activeMenuItem === "CONSIGNMENT" && (
            <Consignment alertError={alertError} alertSuccess={alertSuccess} setRightContent = {setMenuRightContent} />
          )}
          {activeMenuItem === "INVENTORY" && (
            <Inventory alertError={alertError} alertSuccess={alertSuccess} setRightContent= {setMenuRightContent}/>
          )}
        </div>
      <Toaster containerStyle={{ top: "50px" }} />
    </Body>
  );
}

export default Records;

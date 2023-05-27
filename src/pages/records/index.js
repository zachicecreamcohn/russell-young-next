import Body from "@/components/_common/Body/Body"
import { checkLogin } from "@/common/util/auth"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";

function Records() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    ></Body>
    )
}

export default Records
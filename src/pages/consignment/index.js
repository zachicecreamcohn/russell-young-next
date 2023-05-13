import Body from "@/components/Body/Body"
import { checkLogin } from "@/common/util/auth"
import { useEffect, useState } from "react"
import { CircularProgress } from "@mui/material";

function Consignment() {
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
    activeTab="consignment"
    ></Body>
    )
}

export default Consignment
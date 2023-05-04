import Navbar from "@/components/Navbar/Navbar";
import styles from "./Body.module.css";

// this is a simple component that shows the navbar and styles the body of the page
function Body(props) {
  const bodyClasses = [styles.body];

  if (props.center) {
    bodyClasses.push(styles.center);
  }

  if (props.direction === "row") {
    bodyClasses.push(styles["flex-row"]);
  } else if (props.direction === "col") {
    bodyClasses.push(styles["flex-col"]);
  }

  return (
    <>
      <Navbar />
      {/* show the body (can put any html inside) */}
      {/* if prop center = true, add class .center to body. */}
      {/* If align="row", add flex-row. If align=col, add flex-col */}
      <div className={bodyClasses.join(" ")}>{props.children}</div>
    </>
  );
}

export default Body;

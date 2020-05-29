import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let attachedClasses = `${classes.SideDrawer} ${classes.Close}`;
  if (props.show) {
    attachedClasses = `${classes.SideDrawer} ${classes.Open}`;
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;

import { AppBar, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

//navigointi sivujen välillä
function Navbar() {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar className="navbar">
        <nav>
          <Link className="navbaritem" to={"/"}>
            Traininglist
          </Link>
          <Link className="navbaritem" to={"/customerlist"}>
            Customerlist
          </Link>
          <Link className="navbaritem" to={"/trainingsCalendar"}>
            Trainings Calendar
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

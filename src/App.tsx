import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import { ThemeProvider, createTheme } from "@mui/material";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import AllProjects from "./Pages/AllProjects";
import Pnf from "./Pages/Pnf";

const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/projects" element={<AllProjects></AllProjects>}></Route>
        <Route path="/login" element={<Auth></Auth>}></Route>
        <Route path="/register" element={<Auth register></Auth>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/*" element={<Pnf></Pnf>}></Route>
      </Routes>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default App;

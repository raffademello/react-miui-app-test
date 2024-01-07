import NavBar from "./Components/NavBar";
import NotFound from "./Components/NotFound";
import Home from "./Components/Home";
import "./Assets/css/bootstrap4_utilities.css";
import "./Assets/scss/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

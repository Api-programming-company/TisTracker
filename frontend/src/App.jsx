import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RegistroDocente from "./pages/RegistroDocente";
import RegistroEstudiante from "./pages/RegistroEstudiante";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registrodocente" element={<RegistroDocente />} />
        <Route path="/registroestudiante" element={<RegistroEstudiante />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

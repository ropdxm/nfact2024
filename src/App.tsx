import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Context from './Context';

function App() {

  return (
    <Context>
      <Router>
        <div className="bg-wrapper"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          {/* <Route path="/path_name/:dynamic" element={<Component_Name />} /> */}
          <Route path="/*" element={<p>404. Not Found</p>} />
        </Routes>
      </Router>
    </Context>
  )
}

export default App

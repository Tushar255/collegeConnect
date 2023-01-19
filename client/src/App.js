import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "pages/home/index";
import Login from "pages/login/login";
// import Register from "pages/login/Register";
// import Profile from "pages/profile/profile";
import Navbar from "./components/Navbar";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
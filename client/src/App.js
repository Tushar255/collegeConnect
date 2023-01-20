import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../src/pages/home/Home";
import Login from "../src/pages/login/login";
import Register from "../src/pages/login/Register";
// import Profile from "../src/pages/profile/Profile";
import Profile from "./pages/profile/profv1";

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route path="/profile" element={<profv1 />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
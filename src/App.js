import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgot from "./pages/auth/forgot";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Reset from "./pages/auth/reset";
import Home from "./pages/home/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

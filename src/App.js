import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Sidebar from "./components/sidebar/sidebar";
import Forgot from "./pages/auth/forgot";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Reset from "./pages/auth/reset";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./service/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";

axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const dispatchLogin = async () => {
      getLoginStatus().then((loggedInStatus) => { 
        dispatch(SET_LOGIN(loggedInStatus))
        console.log('Logged In:', loggedInStatus)
       })
    }
    // const dispatchLogin = async () => {
    //   const loggedInStatus = await getLoginStatus()
    //   dispatch(SET_LOGIN(loggedInStatus))
    //   console.log('Logged In:', loggedInStatus)
    // }
    dispatchLogin()
  })

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        
        <Route path="/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

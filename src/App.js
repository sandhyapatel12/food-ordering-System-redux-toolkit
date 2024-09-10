import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Success from './pages/Success';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import LoginModal from './components/LoginModel';
import LogoutModal from './components/LogoutModel';

const App = () => {

  //destructure from authSlices using useselector
  const { isAuthenticated } = useSelector((state) => {
    return state.auth
  })


  return (
    <Router>
      <Routes>

        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />  when user first time open application  redirect at login page if login process successfully completed then redirect at home page 
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />  if registration process is success then  display popup otherwise not
        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<Error />} />
        <Route path="/google" element={<LogoutModal />} />


      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Success from './pages/Success';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';

const App = () => {

  //destructure from authSlices using useselector
  const { isAuthenticated } = useSelector((state) => {
    return state.auth
  })


  return (
    <Router>
      <Routes>

        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />   {/*  when user first time open application  redirect at login page if login process successfully completed then redirect at home page  */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/success" element={<Success />} />
        <Route path="/*" element={<Error />} />

      </Routes>
    </Router>
  );
};

export default App;

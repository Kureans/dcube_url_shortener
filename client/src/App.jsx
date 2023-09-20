import UrlHeader from './components/UrlHeaderComponent';
import UrlInput from './components/UrlInputComponent';
import Signup from './components/SignupComponent';
import Login from './components/LoginComponent';
import UrlPanel from './components/UrlPanelComponent';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = Cookies.get('jwt');
    let userid = -1;
    if (token) {
      setIsLoggedIn(true);
      const decoded = jwt_decode(token);
      userid = decoded.userid;
      console.log(userid);
    }

  return (
    <>
        <UrlHeader isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<UrlInput/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/urls" element={<UrlPanel userid={userid}/>} />
        </Routes>
    </>
  )
}

export default App;

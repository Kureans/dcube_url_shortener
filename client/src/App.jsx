import UrlHeader from './components/UrlHeaderComponent';
import UrlInput from './components/UrlInputComponent';
import Signup from './components/SignupComponent';
import Login from './components/LoginComponent';
import UrlPanel from './components/UrlPanelComponent';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
        <UrlHeader isLoggedIn={true}/>
        <Routes>
          <Route path="/" element={<UrlInput/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/urls" element={<UrlPanel/>} />
        </Routes>
    </>
  )
}

export default App;

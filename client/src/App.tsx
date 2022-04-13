import './App.css';
import { CssBaseline } from '@mui/material';
import {  Routes, Route, BrowserRouter } from 'react-router-dom';
import NewsPublish from './components/News/news_publish';
import Home from './components/User/Home';
import CityNews from './components/User/CityNews';
import FullNews from './components/User/FullNews';
import Registration from './components/User/Registration';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Navbar from './components/User/Navbar';
import { useState } from 'react';
import YourNews from './components/ReporterHome/YourNews';
import ReporterHome from './components/ReporterHome/ReporterHome';


function App() {
  const[isLoggedin, setLogin] = useState(false)
  const Test = () => (
    <h1>Page Not Found 404 Error</h1>
  )

  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar isLoggedin={isLoggedin}/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login setLogin={setLogin} />} />
        <Route path="logout" element={<Logout setLogin={setLogin} />} />
        <Route path="fullNews/:news_id" element={<FullNews />} />
        <Route path="cityNews/:city" element={<CityNews />} />
        <Route path="registration" element={<Registration />} />

        <Route path="/reporterHome" element={<ReporterHome />} />
        <Route path='/newspublish' element={<NewsPublish/>} />
        <Route path="/yournews" element={<YourNews />} />

        <Route path='*' element={<Test />}/>
        <Route path='/Home' element={<Home/>} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;

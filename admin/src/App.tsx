import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import AllNews from './components/AllNews';
import FullNews from './components/FullNews'
import Navbar from './components/AdminHeader'
import Home from './components/AdminHome'
import { useState } from 'react';
import Table from './components/Statistics_Table'
import AdminLogout from './components/AdminLogout';

function App() {

  const[isLoggedin, setLogin] = useState(false)
  
  return (
    <>
      <BrowserRouter>
        <CssBaseline/>
        <Navbar isLoggedin={isLoggedin}/>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<AllNews />} />
          <Route path="/admin/fullnews/:news_id" element={<FullNews />} />
          <Route path="/admin/statistics" element={<Table />} />
          <Route path="/admin/logout" element={<AdminLogout setLogin={setLogin}/>}  />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
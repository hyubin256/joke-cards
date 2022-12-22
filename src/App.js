import React from 'react';
import Header from './Components/Header/Header';
import HeadBanner from './Components/HeadBanner/HeadBanner';
import Footer from './Components/Footer/Footer';
import {Outlet} from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header></Header>
        <HeadBanner />
        <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;

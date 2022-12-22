import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import Homepage from './Pages/Homepage/Homepage';
import DetailJokes from './Pages/DetailJokes/DetailJokes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import './Asset/Scss/breakpoints.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<App />}>
            <Route path='' element={<Homepage /> }></Route>
            <Route path='homepage-2'>
              <Route path=':idJokes' element={<DetailJokes></DetailJokes>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


import axios from "axios";
import React, {useEffect, useState} from 'react';
import { useDispatch} from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { addAllTitle, addHalfTitle } from "../../Store/Model/titleJokeSlice";
import { addAllContent } from "../../Store/Model/contentJokeSlice";
import iconDown from '../../Asset/Images/icon_down.png';
import iconUser from '../../Asset/Images/shape@3x.png';
import './Header.scss';

function Header() {   
  const dispatch = useDispatch();
  const location = useLocation(); 
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const handleShowMenuMobile = ()=>{
    setShowMenuMobile(!showMenuMobile);      
  }
  const handleShowSubMenu = ()=>{
      setShowSubMenu(!showSubMenu);      
  }
  useEffect(() => {
    setShowMenuMobile(false);
    setShowSubMenu(false);
  },[location])
  useEffect(() => {    
    const handleGetTitle = async () => {
      const response = await axios({
        url: "https://api.chucknorris.io/jokes/categories",
      })
      const halfAmount = await response.data.length / 2;
      const halfJokesToShow = await response.data.filter(
        (element, index) => index < halfAmount
      );      
      dispatch(addHalfTitle(halfJokesToShow));   
      dispatch(addAllTitle([...response.data,'uncategorized']));         
    };
    const handleGetContent = () => {
      axios({
        url: "https://api.chucknorris.io/jokes/search?query=all",
      }).then(function(response) {
        const classifyCategory = {
          uncategorized: [],
          animal: [],
          career: [],
          celebrity: [],
          dev: [],
          explicit: [],
          family: [],
          fashion: [],
          food: [],
          history: [],
          money: [],
          movie: [],
          music: [],
          political: [],
          religion: [],
          science: [],
          sport: [],
          travel: [],
          all:[]
        };               
        response.data.result.forEach((element) => {
          if (!classifyCategory[element.categories] && element.categories[0]) {
            classifyCategory[element.categories] = [element];
          } else if (
            classifyCategory[element.categories] &&
            element.categories[0]
          ) {
            classifyCategory[element.categories].push(element);
          }
          if (!element.categories[0]) {
            classifyCategory["uncategorized"].push(element);
          }
          classifyCategory["all"].push(element);
        });
        dispatch(addAllContent(classifyCategory));              
      });
    };
    handleGetTitle();
    handleGetContent();    
  }, []); 
  return (
    <div className="header">
      <div className='header__static'></div>
      <div className='header__fixed'>
        <div className={showMenuMobile ? 'bar-button showing' : 'bar-button'} onClick={handleShowMenuMobile}></div>
        <div className='wrapper'>
          <div className='container'>          
            <div className='nav-menu'>            
              <ul className='nav-container'>
                <li className='item'>
                  <Link to='/' className='main-link'>SO FUNKTIONIERT'S</Link>
                </li>
                <li className='item'>
                  <Link to='/' className='main-link'>SONDERANGEBOTE</Link>
                </li>
                <li className='item'>
                  <Link to="/" className='main-link'>
                    <div className='left'>
                      <img src={iconUser} alt='images' />
                      MEIN BEREICH
                    </div>
                    <img src={iconDown} alt='images' className='right'></img>
                  </Link>
                  <ul className='sub-nav-container show'>
                    <li className='sub-item'>
                      <Link to='/'>My published jokes</Link>
                    </li>
                    <li className='sub-item'>
                      <Link to='/'>My saved jokes</Link>
                    </li>
                    <li className='sub-item'>
                      <Link to='/'>Account information</Link>
                    </li>
                    <li className='sub-item'>
                      <a href='/'>Publish new joke</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={showMenuMobile ? 'header__nav-mobile show' : 'header__nav-mobile'}>
        <ul className='nav-mobile__container'>
          <li className='item'>
            <Link to='/' className='main-link'>SO FUNKTIONIERT'S</Link>
          </li>
          <li className='item'>
            <Link to='/' className='main-link'>SONDERANGEBOTE</Link>
          </li>
          <li className='item'>
            <div className='main-link 'onClick={handleShowSubMenu}>
              <div className='icon-user'>
                <img src={iconUser} alt='images' />
              </div> 
                MEIN BEREICH 
              <div className={showSubMenu ? 'icon-down show' : 'icon-down'}>
                <img src={iconDown} alt='images'></img>
              </div>                         
            </div>
            <ul className={showSubMenu ? 'sub-nav-container show' : 'sub-nav-container'}>
              <li className='sub-item'>
                <Link to='/'>My published jokes</Link>
              </li>
              <li className='sub-item'>
                <Link to='/'>My saved jokes</Link>
              </li>
              <li className='sub-item'>
                <Link to='/'>Account information</Link>
              </li>
              <li className='sub-item'>
                <a href='/'>Publish new joke</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>      
    </div>
  );
}

export default Header;

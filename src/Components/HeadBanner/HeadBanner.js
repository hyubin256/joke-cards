import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import headBannerBackground from '../../Asset/Images/head_banner_background.png';
import iconSearch from '../../Asset/Images/icon-search.png';
import iconSearchBlack from '../../Asset/Images/icon_black_search.png';
import iconLightening from '../../Asset/Images/icon_lightening.png';
import './HeadBanner.scss';

function HeadBanner() {
  const navigate = useNavigate();  
  const [valueInput, setValueInput] = useState('');
  const [valueFound, setValueFound] = useState([]);
  const [hoverInput, setHoverInput] = useState(false);
  const allDataJokes = useSelector(state => state.contentJokes.all);
  const handleInput = async (e) =>{
    setValueInput(e.target.value);
    if(e.target.value !== '') {
      const getArrSearch = await allDataJokes.filter(element => element.value.includes(e.target.value)).slice(0,5);
      // if(getArrSearch.length===1){
      //   const getTimeOut  = await setTimeout(()=>{
      //     handleNavigate(getArrSearch[0].id);
      //     clearTimeout(getTimeOut); 
      //   },1500); 
           
      // }
      
      setValueFound([...getArrSearch]);
      
    }
    else if(e.target.value === '') setValueFound([]);      
  }
  const handleNavigate = (id) =>{    
    navigate(`/homepage-2/${id}`);
    setValueInput('');
    setValueFound([]);
  } 
  return (
    <div className="head-banner" style={{backgroundImage: `url(${headBannerBackground})`}}>      
      <div className='center-content'>
        <h1 className='title'>The Joke Bible</h1>
        <p className='content'>Daily Laughs for you and yours</p>
        <div className={hoverInput ? 'input-side hover' : 'input-side'}>
          <input
          onFocus={()=>{setHoverInput(true)}} 
          onBlur={()=>{
            setTimeout(()=>{
              const initialTimeOut = setHoverInput(false);
              clearTimeout(initialTimeOut);
            },300)
          }}
          value={valueInput} 
          onChange={handleInput}
          type="text" 
          name="" 
          placeholder='How can we make you laugh today ?' />
          <div className='icon-search'>
            <img src={iconSearch} alt='' className='image-icon-white'/>
            <img src={iconSearchBlack} alt='' className='image-icon-black'/>
          </div>
          {
            hoverInput && <div className='suggestions'>
            <div className='wrapper'>
              {
                valueFound.map((element,index)=>(
                <div className='item' key={index} onClick={()=>{handleNavigate(element.id);console.log(element.id)}}>
                  <img src={iconLightening} alt="" className='icon-lightening'/>
                  <div className='content-search'>
                    <span>
                    {
                      element.categories[0] ? element.categories : 'Uncategorized'
                    } 
                    </span>    
                    : &nbsp; 
                    {
                      element.value
                    }
                  </div>
                </div>
                ))
              }
              {
                valueFound.length===0 && 
                <div className='not-found'>
                  No Jokes found !
                </div>
              }
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default HeadBanner;

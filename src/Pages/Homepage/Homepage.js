import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { addId } from "../../Store/Model/jokeSlice";
import arrowDownYellow from "../../Asset/Images/arrow_down_yellow.png";
import iconLightening from "../../Asset/Images/icon_lightening.png";
import { colorTitle } from "../../ultils/constant";
import "./Homepage.scss";

const Homepage = () => {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  const titleJokes = useSelector(state => state.titleJokes);
  const contentJokes = useSelector(state => state.contentJokes);
  const [isHalfTitle, setIsHalfTitle] = useState(true);
  const [jokesToShow, setJokesToShow] = useState({
    currentCategory: "all",
    currentAmout: 1,
    currentJokesArr: [],
  });
  const handleFilterSubject = (subject) =>{
    let getSixJokes = contentJokes[subject].slice(0, 6);       
    setJokesToShow({
      currentCategory: subject,
      currentAmout: 1,
      currentJokesArr: [...getSixJokes],
    })
  }
  const handleLoadMore = async () =>{
    const getCurrentAount = await jokesToShow.currentAmout;
    const getCurrentCategory = await jokesToShow.currentCategory;    
    const addJokesMore = await contentJokes[getCurrentCategory].slice(getCurrentAount*9,(getCurrentAount+1)*9);    
    setJokesToShow({
      ...jokesToShow,
      currentAmout: getCurrentAount+1,
      currentJokesArr: [...jokesToShow.currentJokesArr,...addJokesMore],     
    })
  }
  const handleShowView = () => {
    setIsHalfTitle(!isHalfTitle);
  };
  const handleNavigate = (id) =>{
    dispatch(addId(id));
    navigate(`/homepage-2/${id}`)
  }  
  useEffect(() => {    
    console.log(contentJokes)
      let getSixJokes = contentJokes.all.slice(0, 6);
      setJokesToShow({...jokesToShow, currentJokesArr: [...jokesToShow.currentJokesArr,...getSixJokes]});          
  }, [contentJokes]);  
  var countRow = 1;  
  return (
    <div className="homepage">
      <div className="container">
        <div className="homepage__tab">
          {!isHalfTitle &&
            titleJokes.allTitle.map((element, index) => {              
              let getPositionTitle = 0;
              let arrCompare = colorTitle.length;                
              if(index<arrCompare*countRow){
                getPositionTitle = index-arrCompare*(countRow-1);
                if(getPositionTitle===arrCompare-1) countRow+=1; 
                    
              }                     
            return (            
              <div
                key={index}
                className={clsx(["tab__item",`${colorTitle[getPositionTitle]}`])}                
                onClick={()=>{handleFilterSubject(element)}}
              >
                {element}
              </div>  
            )          
          })}
          {isHalfTitle &&
            titleJokes.halfTitle.map((element, index) => {
            let getPositionTitle = 0;
            let arrCompare = colorTitle.length; 
            if(index===0) countRow=1; 
            if(index<arrCompare*countRow){
              getPositionTitle = index-arrCompare*(countRow-1);
              if(index===arrCompare-1) countRow+=1;       
            }           
            return (
              <div
                key={index}
                className={clsx(["tab__item",`${colorTitle[getPositionTitle]}`])}                
                onClick={()=>{handleFilterSubject(element)}}
              >
                {element}
              </div>
            )})}
          <div className="tab__item view-all" onClick={handleShowView}>
            {isHalfTitle ? "View All" : "Hide"}
            <div
              className={
                  isHalfTitle
                  ? "arrow-container"
                  : "arrow-container showing"
              }
            >
              <img src={arrowDownYellow} alt="images" className="arrow-image" />
            </div>
          </div>
        </div>
        <div className="homepage__jokes">          
          <div className="jokes__wrapper">
            {jokesToShow.currentJokesArr.map((element,index) => (
              <div key={index} className="jokes__item" onClick={()=>{handleNavigate(element.id)}}>
                <div className="category">
                  <img
                    src={iconLightening}
                    alt=""
                    className="icon-lightening"
                  />
                  {!element.categories[0]
                    ? "Uncategorized"
                    : element.categories}
                </div>
                <div className="value">{element.value}</div>
              </div>
            ))}
          </div>            
          <button type="" className="jokes__load-more" onClick={handleLoadMore}>
            View More
            <img src={arrowDownYellow} alt="" />
          </button>       
        </div>
      </div>
    </div>
  );
};

export default Homepage;

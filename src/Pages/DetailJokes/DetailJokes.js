import React, {useState, useEffect} from 'react';
import arrowLeft from '../../Asset/Images/arrow-left.png';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LikeButton from '../../Components/LikeButton/LikeButton';
import MoveButton from '../../Components/MoveButton/MoveButton';
import './DetailJokes.scss';

const DetailJokes = () => {  
  const {idJokes} = useParams();
  const navigate = useNavigate();
  const [jokeToShow, setJokeToShow] = useState({
    categories: [],
    created_at: "",
    icon_url: "",
    id: "",
    updated_at: "",
    url: "",
    value: ""
  })
  const [currentPlace, setCurrentPlace] = useState(0)
  const handleNavigate = (place)=>{
    navigate(`${place}`)
  }
  
  const handleMove = async (maths) =>{    
    const handleAxios = await axios(`https://api.chucknorris.io/jokes/search?query=all`);    
    const getData = handleAxios.data.result;
    if(maths === 'plus')
    {
      setCurrentPlace(currentPlace+1);
      setJokeToShow({...getData[currentPlace+1]});      
    }
    else{
      setCurrentPlace(currentPlace-1);
      setJokeToShow({...getData[currentPlace-1]});
    }
  }   
  
  useEffect(() => {
    const handleGetApi = async () =>{
      const handleAxios = await axios(`https://api.chucknorris.io/jokes/search?query=all`);      
      const getData = await handleAxios.data.result.filter((element,index) => {
        if(element.id === idJokes) {
          setCurrentPlace(index)
          return true;
        }
        else return false;
      });
      setJokeToShow({...getData[0]});
    }
    handleGetApi();    
  }, []);
  return (
    <div className="detail-jokes">
      <div className='container'>        
        <div className='detail-jokes__back'>
          <div className='wrapper' onClick={()=>{handleNavigate('/')}}>
            <img src={arrowLeft} alt='' />
          </div>
        </div>
        <div className='detail-jokes__bottom'>
          <div className='left'>
            <div className='box-content'>
              <div className='box-content__category'>
                {jokeToShow.categories[0] ? jokeToShow.categories[0] : 'Uncategorized'}
              </div>
              <div className='box-content__value'>
                {jokeToShow.value}
              </div>
            </div>
            <div className='switch'>
              <div className='like-side'>
                <LikeButton isLike />
                <LikeButton />
              </div>
              <div className='move-side'>
                <MoveButton  isPrevious handleMove={handleMove} />
                <MoveButton  handleMove={handleMove} />
              </div>
            </div>
          </div>
          <div className='right'>
          
          </div>
        </div>
               
      </div>
    </div>
  );
}

export default DetailJokes;

import React from 'react';
import arrowLeft from '../../Asset/Images/arrow-left.png';
import './MoveButton.scss';

const MoveButton = ({isPrevious, handleMove}) => {
  return (
    <div className={
      isPrevious ? 'previous-button' : 'next-button'}
      onClick = {()=>{handleMove(isPrevious ? 'subtract' : 'plus')}}
      >
      <img src={arrowLeft} alt="" />
      <div className='text'>{isPrevious ? 'Previous' : 'Next' }</div>      
    </div>
  );
}

export default MoveButton;

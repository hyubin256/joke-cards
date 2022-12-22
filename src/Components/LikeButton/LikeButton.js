import React from 'react';
import './LikeButton.scss';
import imageLike from '../../Asset/Images/hand@3x.png';
import imageDisLike from '../../Asset/Images/hand-copy@3x.png';
function LikeButton({isLike}) {
  return (
    <div className={isLike ? 'like-button' : 'dislike-button'}>
      <img src={isLike ? imageLike : imageDisLike} alt="" />
    </div>
  );
}

export default LikeButton;

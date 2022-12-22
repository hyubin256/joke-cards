import React from 'react';
import imageFooter from '../../Asset/Images/footer_background.png'
import rightArrowYellow from '../../Asset/Images/right_arrow_yellow.png'
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className='footer__background'>
        <img src={imageFooter} alt="" />
      </div>
      <div className='footer__direction'>
        <div className='container'>
          <p className='content'>
            Got jokes? Get paid<br />
            For Submitting
          </p>
          <button className='submit-button'>
            SUBMIT JOKE 
            <img src={rightArrowYellow} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

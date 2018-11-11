import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" 
                  options={{ max : 25 }} 
                  style={{ height: 130, width: 130 }} 
            >
                <div className="Tilt-inner pa3">
                    <img src={brain} alt='logo' style={{paddingTop: '7px', height: '90px'}} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
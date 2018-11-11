import React from 'react';
import './FaceDetection.css';


const FaceDetection = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt3 mb3'>
                <img id='inputImage' alt='' src={imageUrl} width='400px' height='auto' />
                <div className='faceBox' style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}></div>
            </div>
        </div>
    );
}

export default FaceDetection;
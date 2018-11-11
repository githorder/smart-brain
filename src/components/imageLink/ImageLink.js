import React from 'react';
import './ImageLink.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 100,
      margin: '0 10px',
      border: 0,
      color: 'white',
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  




const ImageLink = ({onInputChange, onButtonSubmit}) => {
    
    return (
        <div>
            <p className='f3 ws'>
                {`This magic brain will detect faces in your pictures. 
                Have crack at it.`}
            </p>
            <div className='center'>
                <div className='form height center pa3 br3 shadow-5'>
                    
                    <TextField
                        className='f5 w-70 pad center'
                        id="outlined-full-width"
                        label="Image URL"
                        placeholder="Insert an image URL"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={onInputChange}
                    /> 
                    
                    <StyledButton onClick={onButtonSubmit} className='f4 w-30 hvr-glow'>
                        Detect
                    </StyledButton>
                    
                </div>
            </div>
        </div>
    );
}

export default ImageLink;

                    // {/* <input type='text' className='f5 w-70  center' />
                    // <button 
                    //     className='f4 w-30 grow link ph3 pv2 
                    //     dib white bg-light-purple'
                    // >
                    //     detect
                    // </button> */}

                        
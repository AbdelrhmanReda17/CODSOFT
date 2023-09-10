/* eslint-disable react/prop-types */
import React , {useEffect}from 'react';
import IconButton from '@mui/material/IconButton';

function ColorOptionsSelector({ colors, selectedColor, onSelectColor , defaultValue }) {
  useEffect(()=> {
    onSelectColor(defaultValue);
  },[])
  return (
    <div>
      <div>
        {colors.map((color) => (
          <IconButton
            key={color}
            size='medium'
            style={{
              backgroundColor: color,
              marginRight: '10px',
              border: `2px solid ${selectedColor === color ? 'black' : 'white'}`,
            }}
            onClick={() => onSelectColor(color)}
          >
          </IconButton>
        ))}
      </div>
    </div>
  );
}

export default ColorOptionsSelector;

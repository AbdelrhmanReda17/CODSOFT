/* eslint-disable react/prop-types */

import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import Button from '@mui/joy/Button';


const SizeOptionsSelector = ({ sizes, onSelectSize, selectedSize , defaultValue}) => {
  useEffect(()=> {
      onSelectSize(defaultValue);
  },[])
  return (
    <>   
     {sizes.map((size) => (
        <Button
          key={size}
          variant={selectedSize === size ? 'soft' : 'outlined'}
          onClick={() => onSelectSize(size)}
          size="sm"
          color="primary"
          className='me-1'
        >
          {size}
        </Button>
      ))}
    </>

  )
}

export default SizeOptionsSelector
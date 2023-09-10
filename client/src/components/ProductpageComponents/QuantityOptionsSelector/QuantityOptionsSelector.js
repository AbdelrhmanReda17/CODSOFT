import React from 'react'
import {Button ,ButtonGroup } from '@mui/joy';


// eslint-disable-next-line react/prop-types
const QuantityOptionsSelector = ({ quantity, onIncrease, onDecrease  }) => {
  
  return (
    <ButtonGroup className='me-3' variant="outlined" color="primary" aria-label="quantity">
      <Button onClick={onDecrease}>-</Button>
      <Button disabled variant="solid" >{quantity}</Button>
      <Button onClick={onIncrease}>+</Button>
    </ButtonGroup>  )
}

export default QuantityOptionsSelector
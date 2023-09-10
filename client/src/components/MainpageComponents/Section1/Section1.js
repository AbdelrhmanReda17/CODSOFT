import { Skeleton } from '@mui/material';
import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'

const Section1 = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleLoading = () => {
    setImageLoaded(true);
  }
  return (
    <div className='d-flex align-items-center justify-content-start'>
      <Image
        className='img-fluid position-relative'
        src='images/homeMen.webp'
        onLoad={handleLoading}
      />
      {imageLoaded ?     <div className='caption d-none d-lg-block '>
        <h1> NEW MEN COLLECTION </h1>
        <p> AR </p>
        <Button variant='primary'>Shop Now !</Button>
    </div> : <h1> Loading  </h1> }
</div>
  )
}

export default Section1
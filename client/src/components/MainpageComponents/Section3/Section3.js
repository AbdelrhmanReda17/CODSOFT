import React from 'react'
import FeaturedProduct from '../../FeaturedProduct/FeaturedProduct';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@mui/material';

const Section3 = () => {
    const { products , isLoading } = useSelector((state) => state.products);
  return (
    <div className='Section3-container'>
        <h1 className='mt-4 p-lg-3'>
            Featured Products
        </h1>
        <hr className='mb-4'/>
        {
            isLoading ?   (
                    <Grid container justifyContent="center"  > <CircularProgress alignItems='center' />  </Grid>
                )
              :
        (
        <div className='container-xxl pt-5 pb-5'>
            <div className='row gap-4 d-flex justify-content-center align-items-center'>
                    {products.map((product, index) => (
                    <div key={index} className="col-lg-2 col-md-3 col-sm-4">
                        <FeaturedProduct
                            product={product}
                        />
                    </div>
                ))}
            </div>
        </div>
        )
        }
    </div>
  )
}

export default Section3
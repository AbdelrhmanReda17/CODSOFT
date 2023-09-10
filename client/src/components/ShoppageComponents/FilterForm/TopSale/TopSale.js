import ArrowOutward from '@mui/icons-material/ArrowOutward'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'
import { Divider, Rating , CircularProgress  } from '@mui/material'
import React from 'react'
import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const TopSale = () => {
  const { BestSelling  , isLoading } = useSelector((state) => state.products);
  return (
    <div className='mt-5'>
        <h5> Top Sale Products </h5>
        {
            isLoading ? <div className='d-flex flex-column gap-4 mt-4 justify-content-center align-items-center w-100 h-100'> <CircularProgress />  </div> :
            <div className='d-flex flex-column gap-4 mt-4'>
                {BestSelling.map((product) => (
                    <>
                    <div key={product._id} className=' d-flex flex-row flex-grow-1 gap-3'>
                        <Image src={product.imageUrl} width={75} height={75} rounded />
                        <div>
                            <div>
                            <Link
                                href={`/shop/product/${product._id}`}
                                fontWeight='md'
                                color='neutral'
                                >
                                {product.name}
                            </Link>
                            </div>
                            <Rating name="read-only" value={product.AverageRating} readOnly />   
                            <Typography color='neutral' className='m-0 p-1'> {product.price}$ </Typography>
                        </div>               
                    </div>    
                    {
                        BestSelling[2]._id !== product._id ? (
                            <Divider  style={{ backgroundColor: 'black' }} />
                        ) : null
                        }
                    </>
                ))}
        </div>
        }
    </div>
  )
}

export default TopSale
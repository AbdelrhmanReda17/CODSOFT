import React, { useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import PropTypes from 'prop-types';
import { Rating } from '@mui/material';

const FeaturedProduct = ({product}) => {
  
  FeaturedProduct.propTypes = {
        product: PropTypes.object.isRequired,
      };
    return (
      <>
    <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'small' }}>
    <CardOverflow>
      <AspectRatio sx={{ minWidth: 150 }}>
        <img
          src={product.imageUrl}
          srcSet={product.imageUrl}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
    </CardOverflow>
    <CardContent>
      <div className="d-flex flex-row justify-content-between">
              <Typography level="body-xs">
        {product.category}
          
      </Typography>
      <Rating
        size='small'
          name="product-rating"
          value={product.AverageRating}
          precision={0.5}
          readOnly
          style={{ marginLeft: '10px' }}
        />
      </div>
      <Link
        href={`/shop/product/${product._id}`}
        fontWeight="md"
        color="neutral"
        textColor="text.primary"
        overlay
        endDecorator={<ArrowOutwardIcon />}
      >
        {product.name}
        
      </Link>
      <Typography
        className='me-auto'
        level="title-lg"
        sx={{ mt: 1, fontWeight: 'xl' }}
        endDecorator={
            product.discountPercentage !== 0 && (
              <Chip component="span" size="sm" className='d-none d-md-block' variant="soft" color="success">
                {product.discountPercentage}% discount
              </Chip>
            )
          }
      >
            {product.discountPercentage !== 0 ? (
                <div>
                    <span className='text-decoration-line-through text-muted m-1'>
                        ${product.price}    
                    </span>
                    {(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
                </div>
            ) : (
                `$${product.price}`
            )}      
    </Typography>
      <Typography level="body-sm ms-auto">
      {product.stock !== 0 ? (
            <p className='m-0 p-0'>
            Only <strong>{product.stock}</strong> left in stock!
            </p>
        ) : (
            <p  className='m-0 p-0'>Out of Stock</p>
        )}      
  </Typography>
  </CardContent>
  </Card>
      </>
  )
}

export default FeaturedProduct
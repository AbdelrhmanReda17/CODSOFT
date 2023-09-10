/* eslint-disable react/prop-types */
import { Avatar, Typography, Rating } from '@mui/material';
import React from 'react';
import moment from 'moment';
import ReviewForm from '../ReviewForm/ReviewForm';
const Reviews = ({ product }) => {

  return (
    <div>
      <div>
        {(product.reviews.length === 0) ? <h4> No Reviews yet </h4>:
        product.reviews.map(review => (
            <div className="card mb-3" key={review._id} style={{ backgroundColor: 'transparent' }}>
                <div className="card-body" >
                    <div className="d-flex flex-row align-items-center gap-3">
                    <Avatar>{review.username.charAt(0)}</Avatar>
                    <div className='w-100'>
                        <div className=' d-flex flex-row justify-content-between align-items-center'>
                        <Typography variant="h6" color="primary">
                            {review.username}
                        </Typography>
                        <Rating
                            name="product-rating"
                            value={review.rating}
                            precision={0.5}
                            readOnly
                            style={{ marginLeft: '10px' }}
                        />
                        </div>

                        <Typography variant="body2" className="text-muted">
                        {moment(review.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                        </Typography>
                        <Typography variant="body1">
                        {review.comment}
                        </Typography>
                    </div>
                    </div>
                </div>
            </div>
        ))
        
    }
      </div>
      <div>
        <ReviewForm id={product._id}/>
      </div>
    </div>
  );
};

export default Reviews;

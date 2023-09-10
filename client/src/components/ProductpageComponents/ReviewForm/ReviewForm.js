/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, TextField, Typography, Rating  , Alert  , AlertTitle} from '@mui/material';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { createComment } from '../../../actions/products';

const ReviewForm = ({id}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment || rating === 0) {
      setIsError(true);
      return;
    }else{
      setIsError(false);
      const newReview = {
      username: user?.result?.username,
      comment,
      rating,
      createdAt: new Date(), 
    };
      dispatch(createComment(id,newReview));
      setComment('');
      setRating(0);
    }
  };
<Alert severity="error">Please fill in all fields and select a rating.</Alert>
  return (
    <Card className="mb-3" style={{ backgroundColor: 'transparent' }}>
      {isError && 
      
      <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Please fill in all <strong>fields</strong> and select a <strong>rating</strong>. 
    </Alert>
      }

      <Card.Body>
        <Form onSubmit={handleSubmit}>
        <div className='d-flex text-center flex-row justify-content-between align-items-center'>      
        <Card.Text as="h5"> Add a Review </Card.Text>

            <div className=' w-50  d-flex flex-row justify-content-center align-items-center m-3'>
            <Typography variant="h6" className='me-3 pb-1'>
                Your Rating
            </Typography>
            <Rating
                size="medium"
                name="rating"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => setRating(newValue)}
            />
            </div>
        </div>
        <div className='mt-3 mb-3'>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" disabled={!user} variant="contained" color="primary">
            Submit Review
          </Button>
        </div>
      </Form>
      </Card.Body>
    </Card>
  );
};

export default ReviewForm;

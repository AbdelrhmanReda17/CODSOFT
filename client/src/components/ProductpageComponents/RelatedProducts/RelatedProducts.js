/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, Card, CardContent, CardActionArea, CardMedia, Divider, Rating, Chip, Box } from '@mui/material';
import { Col, Row } from 'react-bootstrap';

const RelatedProducts = ({ RProducts, openPost }) => {
  return (
    <Row container xs='auto' className='d-flex gap-lg-0 gap-5 mt-4 align-items-center justify-content-center'>
      {RProducts.map(({ name, description, price, AverageRating, imageUrl, _id, discountPercentage }) => (
        <Col key={_id} sm={12} md={5} lg={3}>
          <Card style={{marginRight: "10px"}} cursor={"pointer"} onClick={() => openPost(_id)} elevation={1}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={name}
                image={imageUrl}
                height={250}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
                <Box>
                  {discountPercentage !== 0 ? (
                    <Typography variant="h6"component="span" className='me-2'>
                      <span className='text-decoration-line-through text-muted m-1'>
                        ${price}
                      </span>
                      ${((100 - discountPercentage) / 100) * price}
                    </Typography>
                  ) : (
                    <Typography>${price}</Typography>
                  )}
                  {discountPercentage !== 0 && (
                    <Chip
                      component="span"
                      size="small"
                      variant="soft"
                      color="success"
                      label={`${discountPercentage}% discount`}
                    />
                  )}
                </Box>
                <Rating name="read-only" value={AverageRating} readOnly />
                <Typography variant="subtitle2" color="textSecondary">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default RelatedProducts;

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Paper, Typography, CircularProgress, Divider , Rating , Avatar, IconButton, Snackbar , SnackbarContent,  } from '@mui/material';
import { getProduct } from '../../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { Row , Col, Image, Container} from 'react-bootstrap'
import { ColorOptionsSelector, CustomBreadcrumbs , SizeOptionsSelector , QuantityOptionsSelector , Tabs , RelatedProducts as Related , Footer} from '../../components';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {addItemToCart} from '../../actions/products'
import Button from '@mui/joy/Button';

import './Productpage.css';
const Productpage = () => {
    const { id } = useParams();
    const { product, products, isLoading , RelatedProducts} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [ isAdd , setIsAdd ] = useState(false);

    const user = JSON.parse(localStorage.getItem('profile'));
  

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setIsAdd(false);
    };

    useEffect(() => {
      dispatch(getProduct(id));
    }, [id ]);

    const handleColorSelection = (color) => {
      setSelectedColor(color);
    };
    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    };

    const handleIncrease = () => {
      setQuantity(quantity + 1);
    };
    const openPost = (_id) => navigate(`/shop/product/${_id}`);

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleAddToCart = () => {
      const user = JSON.parse(localStorage.getItem('profile'));
      let existingCartItem = user.shoppingCart.find(
        (cartItem) => cartItem.product._id === product._id
      );
    
      if (existingCartItem) {
        existingCartItem.quantity += quantity;      
        const Shop = user.shoppingCart.map((cartItem => cartItem.product._id === existingCartItem._id ? existingCartItem : cartItem))
      } else {
        existingCartItem = {
          quantity,
          color: selectedColor,
          size: selectedSize,
          product: product,
        };
        user.shoppingCart.push(existingCartItem)
      }
      setIsAdd(true);
      dispatch(addItemToCart(user.result._id, user.shoppingCart));
    };


  
    if (!product) return null;
    const type = product.department == "Men's Fashion" ? 'men' : 'women';

    if (isLoading) {
      return (
        <Paper elevation={6} >
          <CircularProgress size="7em" />
        </Paper>
      );
    }
  return (
    <>
    <div className="d-flex justify-content-center p-5 BgColor">
      <Container fluid='xxl'>
        <Row xs='auto' className='gap-5' >
          <Col xs={12} sm={11} md={5} className='mr-2'>
            <Image src={product.imageUrl} fluid className='w-100 h-100' />
          </Col>
          <Col xs={12} sm={11} md={6}>
            <CustomBreadcrumbs type={type} name={product.name} className='p-2' />
            <div>
              <div className='d-flex flex-row justify-content-between align-items-center'>
                                <Typography variant="h3" color="initial" className='mt-3 mb-3'>{product.name}</Typography>             
                <Rating name="read-only" value={product.AverageRating} readOnly />
              </div>

              <Typography variant="h4" color="initial" className='mt-3 mb-3'>
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
              <Typography variant="h6" color="initial" className='mt-3 mb-3'>{product.description}</Typography>
            </div>
            <div className='mt-2 mb-3' >
              <ColorOptionsSelector
                defaultValue={product.colors[0]}
                colors={product.colors}
                selectedColor={selectedColor}
                onSelectColor={handleColorSelection}
              />
            </div>
            <div className='mt-3 mb-2'>
              <SizeOptionsSelector
                defaultValue={product.sizes[0]}
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={handleSizeSelection}
              />
            </div>
            <Divider style={{ margin: '20px 0' }} />
            <div className='d-flex flex-row'>
                <QuantityOptionsSelector
                  quantity={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
              />
              <Button onClick={handleAddToCart} disabled={!user} variant='solid' className='w-50'>Add to Cart</Button>
            </div>
            <Divider style={{ marginTop: '20px' }} />
            <div className='d-flex flex-row gap-5'>
              <Typography className='product-footer' > SKU: N/A </Typography>
              <Typography className='product-footer' > Category : {type === 'men' ? "Men" : "Women"} </Typography>
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Tabs  product={product}/>
        </Row>
        <Row className='mt-5' >
          <Typography variant='h3'> Related Products </Typography>
          <Related  openPost={openPost} RProducts={RelatedProducts}/>
        </Row>

      </Container>
      
      <Snackbar
          open={isAdd}
          autoHideDuration={1400}
          onClose={handleClose}
          maxSnack={4}
        >
          <SnackbarContent
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                src={product.imageUrl}
                sx={{marginLeft: 1 , marginRight: 1}}
                />
                {product.name} is successfully added to your cart
                </span>
            }
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            sx={{ backgroundColor: "rgb(25, 118, 210)" }}
          />
        </Snackbar>

    </div>
    <Footer/>
    </>
  )
}

export default Productpage
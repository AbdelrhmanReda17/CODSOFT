import { IconButton, Typography, ButtonGroup } from '@mui/material';
import Divider from '@mui/joy/Divider';
import Card from '@mui/joy/Card';
import React, { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import { Paper , Snackbar , SnackbarContent, } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import {addItemToCart} from '../../actions/products'
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { Paypal } from '../../components';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
function createData(cartItem) {
  const originalPrice = cartItem.product.price;
  const discountPercentage = cartItem.product.discountPercentage;
  const discountedPrice = discountPercentage > 0 ? (originalPrice - (originalPrice * discountPercentage) / 100).toFixed(2) : originalPrice;
  return {
    productName: cartItem.product.name,
    ImageUrl: cartItem.product.imageUrl,
    Price: discountedPrice,
    Quantity: cartItem.quantity,
    Subtotal: (discountedPrice * cartItem.quantity).toFixed(2),
    _id: cartItem.product._id,
  };
}

const ShopCartpage = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [ rows, setRows ] = useState([]);
  const [ isError , setIsError ] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [ isCheckout , setIsCheckout] = useState(false);
  const [ isPayedError, setIsPayedError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsError(false);
    setIsPayedError(false);
  };

  useEffect(() => {
    if(!user){
      navigate('/');
    }
    if (user?.shoppingCart) {
      setRows(user.shoppingCart.map((cartItem) => createData(cartItem)));
    }
  }, []);
  useEffect(()=>{
    setTotalPrice(user?.totalPrice || 0.0);
  },[user ]);
  
  const deleteCartItem = (row) => {

      const updatedShoppingCart = user.shoppingCart.filter((item) =>
        item.product._id !== row._id
      );
      dispatch(addItemToCart(user.result._id, updatedShoppingCart));
      setRows(updatedShoppingCart.map((item) => createData(item)));
      if(updatedShoppingCart.length == 0){
          navigate('/');
      }
  };

  const handleIncrease = (row) => {
  
    const cartItem = user.shoppingCart.find(
      (item) => item.product._id === row._id
    );
  
    if (cartItem && cartItem.quantity < cartItem.product.stock) {
      const updatedShoppingCart = user.shoppingCart.map((item) =>
        item.product._id === row._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      dispatch(addItemToCart(user.result._id, updatedShoppingCart));

      setRows(updatedShoppingCart.map((item) => createData(item)));
    } else {
      setIsError(true);
    }
  };
  
  const handleDecrease = (row) => {  
    const cartItem = user.shoppingCart.find(
      (item) => item.product._id === row._id
    );
  
    if (cartItem && cartItem.quantity > 1) {
      const updatedShoppingCart = user.shoppingCart.map((item) =>
        item.product._id === row._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
  
      dispatch(addItemToCart(user.result._id, updatedShoppingCart));
      setRows(updatedShoppingCart.map((item) => createData(item)));
    } else {
      setIsError(true);
    }
  };
  

  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-5 BgColor'>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isCheckout}
        onClose={() => {setIsCheckout(false); setIsPayedError(true);}}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 750,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.surface',
            }}
          />
          <Paypal setIsPayedError ={setIsPayedError} setIsCheckout={setIsCheckout} />
        </Sheet>
      </Modal>
      <Typography className='text p-5' variant='h1'>
        CART
      </Typography>
      {user?.shoppingCart.length !== 0 ? (
         <div className='d-flex flex-column w-100'>
          <Sheet component={Paper} style={{backgroundColor:"transparent"}} maxWidth="lg" className='w-100'>
          <Table
            borderAxis="xBetween"
            color="neutral"
            size="lg"
            className="w-100"
            stickyFooter={false}
            stickyHeader
            variant="outlined"
            sx={{
              '@media (max-width: 990px)': {
                '& td,': {
                  display: 'block',
                  width: '100%',
                  textAlign: 'right',
                  position: 'relative',
                  padding: '10px 0', // Add vertical padding here
                  paddingRight: '10px',
                  height: '100%',
                },
                '& td::before': {
                  content: 'attr(data-label)',
                  fontWeight: 'bold',
                  position: 'absolute',
                  left: '0',
                  top: '0',
                  padding: '10px', // Adjust the padding as needed for spacing
                  zIndex: '1', // Ensure the header text is above the image
                },
                '&  th': {
                  display: 'none',
                },
                '& tbody': {
                  display: 'block',
                  width: '100%',
                },
                '& tbody tr': {
                  display: 'block',
                  width: '100%',
                },
              },
            }}
          >
            <thead>
              <tr>
                <th align='center'></th>
                <th align='center'></th>
                <th align='center'>Product</th>
                <th align='center'>Price</th>
                <th align='center'>Quantity</th>
                <th align='center'>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <IconButton onClick={() => deleteCartItem(row)}>
                      <HighlightOffIcon fontSize='large' sx={{ color: red[500] }} />
                    </IconButton>
                  </td>
                  <td>
                    <img
                      src={row.ImageUrl}
                      alt={row.productName}
                      style={{ width: '100px', height: '100px' }}
                    />
                  </td>
                  <td scope='row' data-label='Product'>
                    {row.productName}
                  </td>
                  <td data-label='Price'>{row.Price}</td>
                  <td data-label='Quantity'>
                    <ButtonGroup className='me-3' variant="outlined" color="primary" aria-label="quantity">
                      <Button onClick={() => handleDecrease(row)}>-</Button>
                      <Button disabled variant="outlined">{row.Quantity}</Button>
                      <Button onClick={() => handleIncrease(row)}>+</Button>
                    </ButtonGroup>
                  </td>
                  <td data-label='Subtotal'>{row.Subtotal}</td>
                </tr>
              ))}
            </tbody>
          </Table>

         <Snackbar
          open={isError || isPayedError}
          autoHideDuration={1800}
          onClose={handleClose}
          TransitionComponent="SlideTransition"
        >
          <SnackbarContent
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
              <ErrorOutlineIcon className="me-2" fontSize="large"/>
                {isError ? " Out of stock or maximum quantity reached." : " Payment Failed "}
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
            sx={{ backgroundColor: "red" }}
          />
        </Snackbar>

        </Sheet>
          <Card  sx={{maxWidth: '100%' , minWidth : "40%"}} className='ms-lg-auto mt-5 p-5 rounded ' color='neutral'>
            <Typography variant="h3" className='text'>Cart totals</Typography>
            <Divider inset="none" />
            <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
          <ListItem>
            <ListItemDecorator>
            <Typography variant="h5" className='text' color="initial"> Subtotal</Typography>
            </ListItemDecorator>
            <div className='d-flex flex-row justify-content-center align-items-center text-center w-100'>
              <Typography variant="h6" className='text-2' color="initial"> ${totalPrice} </Typography>
            </div>
          </ListItem>
          <ListItem>
          <ListItemDecorator>
            <Typography style={{ marginRight: '28px' }}variant="h5" className='text' color="initial"> Total </Typography>
            </ListItemDecorator>
            <div className='d-flex flex-row justify-content-center align-items-center text-center w-100'>
              <Typography variant="h6" className='text-2' color="initial">${totalPrice} </Typography>
            </div>
          </ListItem>
        </List>
        <Divider inset="none" />
        <Button
            variant="soft"
            color="neutral"
            className='w-50 ms-auto text' 
            endDecorator={<KeyboardArrowRight color='neutral' fontSize='large'/>}
            onClick={()=> setIsCheckout(true)}
          >
              <Typography  variant="h6" className='text' color="initial">  CHECKOUT </Typography>
          </Button>
          </Card>
        </div>
      ) : (
        <h1> NO PRODUCTS </h1>
      )}
    </div>
  );
};

export default ShopCartpage;

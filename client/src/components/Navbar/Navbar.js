import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Paper , Snackbar , SnackbarContent, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const CustomNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [totalPrice, setTotalPrice] = useState(0.0); // Initialize with 0.0
  const [wrongAccess, setWrongAccess] = useState(false); 
  const data = useSelector((state) => state.auth);
  const [hasItems , setHasItems] = useState(true);
  const location = useLocation();

  const logOut = () => {
    dispatch({ type: "LOGOUT" });   
    window.location.reload();
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
  
      if (decodedToken.exp * 1000 < new Date().getTime()) logOut();
    }
    const userProfile = JSON.parse(localStorage.getItem("profile"));
    setUser(userProfile);
    setTotalPrice(userProfile?.totalPrice || 0.0);
  }, [navigate, dispatch , data]); 

  const handleShoppingCart = () =>{
    if(user?.shoppingCart?.length == 0){
      setHasItems(false);
    }else if(user?.shoppingCart?.length > 0){      
      navigate('/shoppingCart/');
      setHasItems(true);
    }else{
      setWrongAccess(true);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setHasItems(true);
    setWrongAccess(false);

  };

  return (
    <Container>
      <Navbar expand="sm" bg="white">
        <Navbar.Brand>
          <img
            src="/Header-logo.png"
            width="110"
            height="80"
            alt="REDO LOGO"
            loading="auto"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNavAltMarkup" />
        <Navbar.Collapse id="navbarNavAltMarkup">
        <Nav className="navbar-nav mx-auto" variant="underline" >
            <Nav.Link
              href="/"
              className={`nav-item nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              HOME
            </Nav.Link>
            <Nav.Link
              href="/shop/all"
              className={`nav-item nav-link ${location.pathname.includes('/shop/all') ? 'active' : ''}`}
            >
              EVERYTHING
            </Nav.Link>
            <Nav.Link
              href="/shop/men"
              className={`nav-item nav-link ${location.pathname.includes('/shop/men') ? 'active' : ''}`}
            >
              MEN
            </Nav.Link>
            <Nav.Link
              href="/shop/women"
              className={`nav-item nav-link ${location.pathname.includes('/shop/women') ? 'active' : ''}`}
            >
              WOMEN
            </Nav.Link>
            <Nav.Link
              href="/shop/accessories"
              className={`nav-item nav-link ${location.pathname.includes('/shop/accessories') ? 'active' : ''}`}
            >
              ACCESSORIES
            </Nav.Link>
        </Nav>
          <Typography sx={{ mr: 2 }} className="text-coloring">
            <strong>${totalPrice}</strong>
          </Typography>
          <IconButton aria-label="Shopping-cart" onClick={handleShoppingCart}>
            <Badge
              badgeContent={user?.shoppingCart?.length || 0}
              color="primary"
            >
              <ShoppingBasketIcon sx={{ fontSize: 25 }} />
            </Badge>
          </IconButton>
          {!user ? (
            <IconButton aria-label="Account" onClick={() => navigate("/login")}>
              <AccountCircleIcon sx={{ fontSize: 25 }} />
            </IconButton>
          ) : (
            <IconButton aria-label="Account" onClick={logOut}>
              <LogoutIcon sx={{ fontSize: 25 }}  />
            </IconButton>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Snackbar
          open={!hasItems || wrongAccess}
          autoHideDuration={1400}
          onClose={handleClose}
          TransitionComponent="SlideTransition"

        >
          <SnackbarContent
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <ErrorOutlineIcon className="me-2" fontSize="large"/>
                { wrongAccess ? "Please Login first !" : "Empty Shopping Cart !" }                
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
    </Container>
  );
};

export default CustomNavbar;

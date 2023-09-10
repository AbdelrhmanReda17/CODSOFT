import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch } from 'react-redux';
import { getProductsBySearch } from '../../../../actions/products';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Snackbar , SnackbarContent} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// eslint-disable-next-line react/prop-types
const Search = ({page , searchText ,type ,setSearchText  }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isCorrect , setIsCorrect] = useState(false);
  const handleSearch = (e)=>{
    if(searchText == ''){
      setIsCorrect(true);
    }else{
        Navigate(`/shop/${type}/search`);
        dispatch(getProductsBySearch(page , searchText));
    }
  }
  const handleClose= ()=>{
    setIsCorrect(false)
  }

  return (
    <>
    <InputGroup className='mt-3 mb-5'>
    <Form.Control
      placeholder="Search products..."
      aria-label="Search products..."
      aria-describedby="basic-addon2"
      value={searchText}
      onChange={ (e)=>setSearchText(e.target.value) }
    />
    <Button variant="primary" id="button-addon2" onClick={handleSearch}>
      <ArrowForwardIosIcon/>
    </Button>
  </InputGroup>
  <Snackbar
      open={isCorrect}
      autoHideDuration={1400}
      onClose={handleClose}
    >
      <SnackbarContent
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            Cannot Search with empty string 
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
  </>
  )
}

export default Search
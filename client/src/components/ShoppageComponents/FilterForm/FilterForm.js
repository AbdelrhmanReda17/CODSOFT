import { InputLabel, MenuItem, TextField, FormControl, OutlinedInput, Button, Typography, InputAdornment, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import CustomSlider from './Slider/Slider';
import Search from './Search/Search';
import Select from './Select/Select';
import Department from './Department/Department';
import TopSale from './TopSale/TopSale';
import CircularProgress from '@mui/material/CircularProgress';

// eslint-disable-next-line react/prop-types
const FilterForm = ({page , type , searchText , setSearchText , setCategory , value1 , setValue1}) => {
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchProduct();
    }
  };


  return (
  <>
    <Form className='p-5'>
      <Search  page={page} type={type} searchText={searchText} setSearchText={setSearchText} />
      <Select type={type} page={page}  setCategory={setCategory} />
      <Typography className='mt-5 mb-1'> Filter by Price </Typography>
      <CustomSlider page={page} type={type} value1={value1} setValue1={setValue1} />
      <Department/>
      <TopSale/>
    </Form>       
  </>
  );
}

export default FilterForm;

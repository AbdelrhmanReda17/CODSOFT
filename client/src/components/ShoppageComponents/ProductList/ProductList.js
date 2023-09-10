import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedProduct from '../../FeaturedProduct/FeaturedProduct';
import { Grid, IconButton, Typography, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { getAll } from '../../../actions/products';

// eslint-disable-next-line react/prop-types
const ProductList = ({ type , page , setSort , sort}) => {
  const data = useSelector((state) => state.products);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    Navigate(`/shop/${type}`);
  }
  if (data.isLoading) {
    return (
      <div className='d-flex w-100 align-items-center justify-content-lg-center h-100'>
        <CircularProgress />
      </div>
    );
  }
  const handleChange = (event, newValue) => {
    Navigate(`/shop/${type}`);
    setSort(newValue);
    dispatch(getAll(type , page , newValue));
  };
  return (
    <div className='d-flex flex-column gap-4'>
      <div className='d-flex flex-row justify-content-between'>
          {data.Filtered || data.Searched ?
            <Breadcrumbs aria-label="breadcrumb" className='mt-2'>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                href={`/shop/${type === 'search' ? 'men' : type}`}
              >
              {type === 'men' ? "Men" : "Women"}
              </Link>
              <Typography color="text.primary">{data.Filtered ? "Filter Result" : "Search Result"}</Typography>
          </Breadcrumbs>
          :
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography color="text.primary">{type === 'men' ? "Men" : "Women"}</Typography>
            </Breadcrumbs>
          }
        <div>
          { (data.Filtered || data.Searched) &&       
            <IconButton onClick={handleClick}>
                <CloseIcon />
            </IconButton>
          }
        </div>

      </div>
        <div className='d-flex flex-row justify-content-between' >
          <Typography>
              Showing {data.currentPage === 1 ? 1 : (9 * (data.currentPage - 1) + 1)}-
              {Math.min(9 * data.currentPage, data.numberOfProducts)} of {data.numberOfProducts} results
          </Typography>
          <Select
            placeholder="Default sorting"
            variant="plain"
            onChange={handleChange}
            defaultValue={sort}
          >
            <Option value="Sdefault" >Default sorting</Option>
            <Option value="Srating" >Sort by Rating</Option>
            <Option value="Slatest">Sort by latest</Option>
            <Option value="Sprice-hl">Sort by price: high to low</Option>
            <Option value="Sprice-lh">Sort by price: low to high</Option>            
          </Select>
        </div> 
      <Grid container alignItems='stretch' spacing={3}>
        {
        data.products.length > 0 ? 
            data.products.map((product) => (
              <Grid key={product._id} item xs={12} sm={12} md={6} lg={4}>
                <FeaturedProduct product={product} />
              </Grid>
            )) :
            <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center Sizing'>
              <SentimentVeryDissatisfiedIcon sx={{fontSize:70 , marginTop: 10}}/>
              NO PRODUCTS
            </div>
        }
      
      </Grid>
    </div>
  );
};

export default ProductList;

import React , { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";
import { getAll , getProductsBySearch ,getProductsByCategory, getProductsByPrice  } from "../../actions/products";
// eslint-disable-next-line react/prop-types
const Paginate = ({page , type , searchText , category ,price , sort}) => {
    const { numberOfPages , isLoading } = useSelector((state)=> state.products);
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
       if(page) {
          if(location.pathname ===`/shop/${type}/price`){
              dispatch(getProductsByPrice(page , type , price));
          }else if (location.pathname ===`/shop/${type}/category`){
              dispatch(getProductsByCategory(page , type , category));
          }
          else if(location.pathname ===`/shop/${type}/search`) {
              dispatch(getProductsBySearch(page , searchText));
          }else{
              dispatch(getAll(type,page , sort));
          }
       }
    },[page , type, location ]);
    
    return (
      !isLoading ? (
        <Pagination
          count={numberOfPages}
          page={Number(page) || 1}
          variant="outlined"
          shape="rounded"
          sx={{ ul: { justifyContent: "center", marginTop: "30px" } }}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              component={Link}
              to={`${location.pathname}?page=${item.page}`}
            />
          )}
        />
      ) : (
        <></>
      )
    );
    
}

export default Paginate
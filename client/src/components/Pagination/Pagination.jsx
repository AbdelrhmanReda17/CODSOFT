import { Pagination , PaginationItem  } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link,useLocation } from 'react-router-dom'

const CustomPagination = () => {
  const { currentPage , numberOfPages  } = useSelector((state) => state.projectsReducer);
  const location = useLocation();
  return (
    <Pagination 
        defaultPage={1}
        count={numberOfPages}
        page={Number(currentPage) || 1}
        variant="outlined" 
        color="primary"
        sx={{ ul: { justifyContent: "center" } }}
        renderItem={(item) => (
        <PaginationItem
            {...item}
            component={Link}
            to={`${location.pathname}?page=${item.page}`}
        />
        )}
    />
  )
}

export default CustomPagination
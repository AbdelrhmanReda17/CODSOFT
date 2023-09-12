import { Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'

// eslint-disable-next-line react/prop-types
const CustomBreadcrumbs = ({type , name}) => {
  console.log(type);
  return (
    <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
        Home
        </Link>
        <Link
        underline="hover"
        color="inherit"
        href={`/shop/${type === 'search' ? 'men' : type}`}
        >
        {type === 'men' ? "Men" : type === 'women' ?  "Women" : "Accessories"}
        </Link>
        <Typography>{name}</Typography>
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
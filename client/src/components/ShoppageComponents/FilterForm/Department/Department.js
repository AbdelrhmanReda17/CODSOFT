import { ButtonBase } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Department = () => {
    const { numberOfMen , numberOfWomen , numberOfAccessories , isLoading } = useSelector((state) => state.products);

  const Navigate = useNavigate();
  const handleClick = (type)=> {
    Navigate(`/shop/${type}`);
  }
  return (
    <div className='mt-5'>
        <h5> Departments </h5>
        <div className='d-flex flex-column'> 
        <ButtonBase className='d-flex flex-row justify-content-between mt-2 mb-2 dep-hover' onClick={()=>handleClick("men")}>
                <span> Men </span>
                <span> ({isLoading ? 'Featching...' :numberOfMen}) </span>
        </ButtonBase>
        <ButtonBase className='d-flex flex-row justify-content-between mt-2 mb-2 dep-hover' onClick={()=>handleClick("women")}>
                <span> Women </span>
                <span> ({isLoading ? 'Featching...' :numberOfWomen}) </span>
        </ButtonBase>
        <ButtonBase className='d-flex flex-row justify-content-between mt-2 mb-2 dep-hover' onClick={()=>handleClick("accessories")}>
                <span> Accessories </span>
                <span> ({isLoading ? 'Featching...' :numberOfAccessories}) </span>
        </ButtonBase>
        </div>
    </div>
  )
}

export default Department
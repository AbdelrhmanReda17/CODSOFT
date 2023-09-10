import React, { useState } from 'react'
import { Typography , Slider , Box} from '@mui/material/';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getProductsByPrice } from '../../../../actions/products';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const CustomSlider = ({page , type , value1 , setValue1}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleClick = () => { 
        navigate(`/shop/${type}/price`)
        dispatch(getProductsByPrice(page , type ,value1));
    };
    function valuetext(value) {
        return `${value}`;
    }
    const minDistance = 1;
    const maxValue = 500;
    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        const [newValue1, newValue2] = newValue.map((val) => Math.min(Math.max(val, 0), maxValue));
        
        if (activeThumb === 0) {
            setValue1([Math.min(newValue1, value1[1] - minDistance), value1[1]]);
        } else {
            setValue1([value1[0], Math.max(newValue2, value1[0] + minDistance)]);
        }
    };

    return (
        <div className='centering'>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                size='small'
                className='slider-width'
                disableSwap
                max={maxValue}
            />
                        <div className='d-flex justify-content-space'>
            <Button variant="primary" id="button-addon2" onClick={handleClick}>
                Filter
            </Button>
             <Typography className='ms-auto' variant='h7' >Price : ${value1[0]} — ${value1[1]}  </Typography>
            </div>
        </div>
    )
}

export default CustomSlider

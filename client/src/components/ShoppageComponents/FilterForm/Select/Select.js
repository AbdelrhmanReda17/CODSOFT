import React, { useRef } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCategory } from '../../../../actions/products';
import { useLocation, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


// eslint-disable-next-line react/prop-types
const Select = ({page ,type  , setCategory }) => {
  const selectRef = useRef();
  const {ClothingCategory} = useSelector((state)=> state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnChange = (e) =>{
      if(e.target.value === ' '){
        navigate(`/shop/${type}`)
      }else{
        setCategory(e.target.value);
        navigate(`/shop/${type}/category`)
        dispatch(getProductsByCategory(page , type ,e.target.value  , navigate));
      }
      selectRef.current.value = '';
    }
  return (
    <FloatingLabel controlId="floatingSelect" label="Filter by Category">
    <Form.Select aria-label="Floating label select example" onChange={handleOnChange} ref={selectRef}>
      { 
       ClothingCategory.map((Category) => (<option key={Category} value={Category}>{Category}</option>))  
      }
      <CloseIcon></CloseIcon>
    </Form.Select>
  </FloatingLabel>
  )
  
}

export default Select
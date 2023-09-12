import React, { useEffect } from 'react'
import { Section1  , Section2 , Section3 , Section4 , Footer} from '../../components'
import { Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { getFeaturedProducts } from '../../actions/products';
import './Mainpage.css';

const Mainpage = () => {  
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getFeaturedProducts());
    },[dispatch])
    
  return (
    <div className='d-flex flex-column align-items-center gap-2'>
        <Row>
            <Section1/>
        </Row>
        <Row className='container'>
            <Section2/>
        </Row>        
        <Row className='BgColor w-100 text-center'>
            <Section3/>
        </Row>
        <Row className='container text-center align-items-center'>
            <Section4/>
        </Row>
        <Row className='container-fluid text-center align-items-center'>
            <Footer/>
        </Row>
    </div>
  )
}

export default Mainpage
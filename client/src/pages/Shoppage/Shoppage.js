import React , {useState} from "react";
import './Shoppage.css'
import { useLocation, useParams } from "react-router-dom";
import { Grow, Grid, AppBar, TextField, Button, Paper, Divider } from '@mui/material';
import { FilterForm , Pagination, ProductList , Footer } from "../../components";
import { Container, Col , Row } from "react-bootstrap";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Shoppage = () => {
  const [searchText , setSearchText] =useState('');
  const [category , setCategory] =useState('');
  const [value1, setValue1] = useState([0, 500]);
  const [sort , setSort] =useState('Sdefault');

  const { type } = useParams();
  const query = useQuery();
  const page = query.get('page') || 1;
  return (
    <>    
    <div className="d-flex justify-content-center p-5 BgColor">
            <Container fluid='xxl'>
              <Row xs='auto' className='gap-5' >
                <Col xs={12} sm={6} md={4} className="p-2">
                      <FilterForm  searchText={searchText} setSearchText={setSearchText} page={page} type={type} setCategory={setCategory} setValue1={setValue1} value1={value1} />
                </Col>
                <Col xs={12} sm={5} md={7} className="BgColor2 p-5">  
                  <ProductList type={type} page={page} setSort={setSort} sort={sort}/>    
                  <Pagination page={page} type={type} searchText={searchText} category={category} price={value1} sort={sort}/>  
                </Col>
              </Row>
          </Container>
    </div>
      <Footer/>
    </>


  );
};

export default Shoppage;

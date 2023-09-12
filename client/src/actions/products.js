import * as api from '../api/index.js';
export const getFeaturedProducts = () => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
        const { data } = await api.fetchFeatured();
        dispatch({ type: "FETCH_FEATURED", payload: data });
      dispatch({ type: "END_LOADING" });
  
    } catch (error) {
      console.log(error.message);
    }
};

  export const getAll = (type,page , sort) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
      if(type === 'men')
        var { data } = await api.fetchMen(page , sort);
      else if(type==='women'){
        var { data } = await api.fetchWomen(page , sort);
      }else if(type==='accessories'){
        var { data } = await api.fetchAccessories(page , sort);
      }else{
        var { data } = await api.fetchAll(page , sort);
      }
        dispatch({ type: "FETCHING", payload: data });
      dispatch({ type: "END_LOADING" });
  
    } catch (error) {
      console.log(error.message);
    }
  };
export const addItemToCart = (id , cartItem ) => async (dispatch) => {
  try {
    dispatch({ type: "ADD-CARTITEM", payload: cartItem });
  } catch (error) {
    console.log(error.message);
  }
}
export const getProduct = (id,navigate) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
        var {data} = await api.getProduct(id);
        dispatch({ type: "FETCHING-PRODUCT", payload: data });
      dispatch({ type: "END_LOADING" });
  
    } catch (error) {
      navigate('/error');
    }
};

export const createComment = (id , newReview) => async (dispatch) => {
  try {
      var { data } = await api.createComment(id , newReview);
      console.log(data);
      dispatch({ type: "CREATING-COMMENT", payload: data });

  } catch (error) {
    console.log(error);
  }
};


export const getProductsBySearch = (page, type,text ,navigate) => async (dispatch) => {
  if(text == ''){
    navigate('/error');
    return;
  }
  try {
    dispatch({ type: "START_LOADING" });
      var { data } = await api.getProductsBySearch(page,type,text);
      dispatch({ type: "FETCHING-SPECIAL", payload: data });
      dispatch({ type: "SEARCH" });
    dispatch({ type: "END_LOADING" });

  } catch (error) {
    navigate('/error');
  }
};
export const getProductsByCategory = (page,type,category , navigate) => async (dispatch) => {
  if(category == ''){
    navigate('/error');
    return;
  }
  try {
    dispatch({ type: "START_LOADING" });
      var { data } = await api.getProductsByCategory(page,type,category);
      dispatch({ type: "FETCHING-SPECIAL", payload: data });

      dispatch({ type: "FILTER" });

    dispatch({ type: "END_LOADING" });

  } catch (error) {
    navigate('/error');
  }
};

export const getProductsByPrice = (page , type,price,navigate) => async (dispatch) => {
  if(price == ''){
    navigate('/error');
    return;
  }
  try {
    dispatch({ type: "START_LOADING" });
      var { data } = await api.getProductsByPrice(page, type ,price);
      dispatch({ type: "FETCHING-SPECIAL", payload: data });
      dispatch({ type: "FILTER" });

    dispatch({ type: "END_LOADING" });

  } catch (error) {
    navigate('/error');
  }
};
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
      else{
        var { data } = await api.fetchWomen(page , sort);
      }
        dispatch({ type: "FETCHING", payload: data });
      dispatch({ type: "END_LOADING" });
  
    } catch (error) {
      console.log(error.message);
    }
  };
export const addItemToCart = (id , cartItem) => async (dispatch) => {
  try {
    // var {data} = await api.addItemToCart(id,cartItem);
    dispatch({ type: "ADD-CARTITEM", payload: cartItem });

  } catch (error) {
    console.log(error.message);
  }
}
export const getProduct = (id) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
        var {data} = await api.getProduct(id);
        dispatch({ type: "FETCHING-PRODUCT", payload: data });
      dispatch({ type: "END_LOADING" });
  
    } catch (error) {
      console.log(error.message);
    }
};

export const createComment = (id , newReview) => async (dispatch) => {
  console.log(id , newReview)
  try {
      var { data } = await api.createComment(id , newReview);
      console.log(data);
      dispatch({ type: "CREATING-COMMENT", payload: data });

  } catch (error) {
    console.log(error.message);
  }
};


export const getProductsBySearch = (page,text) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
      var { data } = await api.getProductsBySearch(page,text);
      dispatch({ type: "FETCHING-SPECIAL", payload: data });
      dispatch({ type: "SEARCH" });
    dispatch({ type: "END_LOADING" });

  } catch (error) {
    console.log(error.message);
  }
};
export const getProductsByCategory = (page,type,category) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
      var { data } = await api.getProductsByCategory(page,type,category);
      dispatch({ type: "FETCHING-SPECIAL", payload: data });

      dispatch({ type: "FILTER" });

    dispatch({ type: "END_LOADING" });

  } catch (error) {
    console.log(error.message);
  }
};

export const getProductsByPrice = (page , type,price) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
      var { data } = await api.getProductsByPrice(page, type ,price);
      dispatch({ type: "FETCHING-SPECIAL", payload: data });
      dispatch({ type: "FILTER" });

    dispatch({ type: "END_LOADING" });

  } catch (error) {
    console.log(error.message);
  }
};
export default (state = { isLoading: true, Filtered: false, Searched: false, products: [] , product: {} , numberOfAccessories:0 , RelatedProducts :[], numberOfProducts :0, numberOfMen: 0 , numberOfWomen:0 , BestSelling : [] , ClothingCategory : []}, action) => {
    switch (action.type) {
      case "START_LOADING":
        return { ...state, isLoading: true };
      case "END_LOADING":
        return { ...state, isLoading: false };
      case 'FETCH_FEATURED':
        return {
          ...state,
          products: action.payload.data
        };
      case 'FETCHING':
        return {
            ...state,
            products: action.payload.data,
            currentPage: action.payload.currentPage,
            numberOfPages: action.payload.numberOfPages,
            numberOfMen: action.payload.numberOfMen,
            numberOfWomen: action.payload.numberOfWomen,
            BestSelling : action.payload.BestSelling,
            ClothingCategory : action.payload.ClothingCategory,
            numberOfProducts:action.payload.numberOfProducts,
            numberOfAccessories:action.payload.numberOfAccessories,
            Searched: false,
            Filtered: false
      };
      case 'FETCHING-PRODUCT':
        return {
            ...state,
            product: action.payload.data[0],
            RelatedProducts: action.payload.RelatedProducts
      };
      case 'FETCHING-SPECIAL':
        return {
          ...state,
          products: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
          numberOfProducts:action.payload.numberOfProducts,
      };
      case 'CREATING-COMMENT':
        console.log(action.payload.data)
        return {
          ...state,
          products: state.products.map((product) =>
          product._id === action.payload.data._id ? action.payload.data : product
        ),
          product : action.payload.data
      };
      case 'SEARCH':
        return { ...state , Searched : true , Filtered : false};
      case 'FILTER':
        return { ...state , Filtered : true , Searched : false};
      default:
        return state;
    }
};
  
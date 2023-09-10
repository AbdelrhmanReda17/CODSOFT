const authReducer = (state = { authData: null, shoppingCart: [], errors: null , totalPrice : 0}, action) => {
    switch (action.type) {
      case "AUTH":
        let user = { ...action?.data , shoppingCart : [] }; 
        localStorage.setItem('profile', JSON.stringify({ ...user }));
        return { ...state, authData: action.data, shoppingCart : [] , totalPrice : 0, errors: null };
      case "LOGOUT":
        localStorage.clear();
        return { ...state, authData: null , shoppingCart : [], errors: null }; // Set shoppingCart to []
      case "ERROR":
        return { ...state, errors: action?.data };
      case 'ADD-CARTITEM':
          var updatedUser = JSON.parse(localStorage.getItem('profile'));
          updatedUser.shoppingCart = [...action?.payload];
          console.log(action.payload);
          const totalPrice = updatedUser.shoppingCart?.reduce((total, cartItem) => {
            const originalPrice = cartItem.product.price;
            const discountPercentage = cartItem.product.discountPercentage;
            const discountedPrice =
              discountPercentage > 0
                ? (
                    originalPrice -
                    (originalPrice * discountPercentage) / 100
                  ).toFixed(2)
                : originalPrice;
      
            return total + discountedPrice * cartItem.quantity;
          }, 0).toFixed(2);          
          updatedUser = {...updatedUser , totalPrice};
          localStorage.setItem('profile', JSON.stringify({ ...updatedUser }));

            console.log(totalPrice);
          return { ...state, shoppingCart: [...action?.payload] , totalPrice };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
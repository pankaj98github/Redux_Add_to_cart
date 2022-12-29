const initialState = {
  cart: [],
};

const updateCart = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOCART":
      const quantity = state.cart.findIndex(
        (quan) => quan.id === action.payload.id
      );
      if (quantity >= 0) {
        state.cart[quantity].rating.count += 1;
        return state;
      } else {
        const rating = { ...action.payload.rating, count: 1 };
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, rating }],
        };
      }

    case "DECREASE":
        {
        const decQuantity = state.cart.findIndex((quan) => quan.id === action.payload.id)
        if(decQuantity >= 1){
            state.cart[decQuantity].rating.count -= 1;
        }
        return {
            state,
        };
    }

    case "REMOVE": {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default updateCart;

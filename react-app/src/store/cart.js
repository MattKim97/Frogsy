const GET_CART = "cart/GET_CART";
const ADD_TO_CART = "cart/ADD_TO_CART";
const UPDATE_CART = "cart/UPDATE_CART";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const CHECKOUT = "cart/CHECKOUT";

export const getCart = (cart) => ({
  type: GET_CART,
  cart,
}); 

export const addToCart = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

export const removeFromCart = (cart) => ({
  type: REMOVE_FROM_CART,
  cart,
});

export const checkout = (cart) => ({
  type: CHECKOUT,
  cart,
});

export const updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const getCartThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/cart`);
  if (response.ok) {
    const cart = await response.json();
    dispatch(getCart(cart));
  }
};

export const addToCartThunk = (frogId, quantity) => async (dispatch) => {
  const response = await fetch(`/api/frogs/${frogId}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      frogId,
      quantity,
    }),
  });
  if (response.ok) {
    const cart = await response.json();
    dispatch(addToCart(cart));
  }
  return response;
};

export const removeFromCartThunk = (frogId) => async (dispatch) => {
  const response = await fetch(`/api/cart/${frogId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const cart = await response.json();
    dispatch(removeFromCart(cart));
  }
};

export const updateCartThunk = (frogId, quantity) => async (dispatch) => {
  const response = await fetch(`/api/cart/${frogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      frogId,
      quantity,
    }),
  });
  if (response.ok) {
    const cart = await response.json();
    dispatch(updateCart(cart));
  }
};

export const checkoutThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/cart/checkout`, {
    method: "DELETE",
  });
  if (response.ok) {
    const cart = await response.json();
    dispatch(checkout(cart));
  }
};

const initialState = {};
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CART:
      case ADD_TO_CART:
      case UPDATE_CART:
      case CHECKOUT:
        return {
          ...state
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;

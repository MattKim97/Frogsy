import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, removeFromCart } from '../../store/cart';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';

export default function Cart() {

  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const sessionUser = useSelector(state => state.session.user)

  const handleDeleteFrog = async (frogId) => {

    const response = await dispatch(removeFromCart(frogId));
    if (response.ok) {
      history.push("/cart");
    }
  }

  useEffect(() => {
    if (!sessionUser) {
      return null
        }
    dispatch(getCartThunk(sessionUser.id));
  }
  , [dispatch]);

  if (!cart) {
    return null;
  }
  console.log("🚀 ~ file: Cart.js:46 ~ Cart ~ cart.items:", cart.items)
  

  return (
<div>
  {sessionUser ? (
    cart.items && cart.items.length > 0 ? (
      cart.items.map(frog => (
        <div key={frog.id}>
          <div>{frog.name}</div>
          <div>{frog.price}</div>
          <div>{frog.quantity}</div>
          <div>Order Price: {frog.price * frog.quantity}</div>
          <div><img className="landingImage" src={`${frog.pictureUrl}`} alt={frog.name} /></div>
          <button onClick={handleDeleteFrog(frog.id)}>Delete Frog</button>
        </div>
      ))
    ) : (
      <div>You have no frogs in your cart</div>
    )
  ) : null}
</div>
  )
}

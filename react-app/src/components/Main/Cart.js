import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkoutThunk,
  getCartThunk,
  removeFromCartThunk,
  updateCartThunk,
} from "../../store/cart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useState } from "react";

export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("🚀 ~ file: Cart.js:17 ~ Cart ~ cart:", cart);
  const sessionUser = useSelector((state) => state.session.user);
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityFrogId, setQuantityFrogId] = useState(null);
  const [quantityStock, setQuantityStock] = useState(null);

  const handleDeleteFrog = async (frogId) => {
    const response = await dispatch(removeFromCartThunk(frogId));
    if (response) {
      history.push("/cart");
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditQuantity = () => {
    openModal();
  };

  const handleQuanitySubmit = async () => {
    const response = await dispatch(updateCartThunk(quantityFrogId, quantity));
    closeModal();
    if (response) {
      history.push("/cart");
    }
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, frog) => total + frog.price * frog.quantity, 0);
  };

  const handleCheckOut = async () => {
    const response = await dispatch(checkoutThunk());
  
    console.log("🚀 ~ file: Cart.js:58 ~ handleCheckOut ~ response:", response)
    if (response) {
      history.push("/cart");
      const orderTotal = calculateOrderTotal(cart.items);
      window.alert(`Order Complete. Your total was: $${orderTotal}`);
    }
  };

  useEffect(() => {
    if (!sessionUser) {
      return null;
    }
    dispatch(getCartThunk(sessionUser.id));
  }, [dispatch, sessionUser]);

  if (!cart) {
    return null;
  }
  console.log("🚀 ~ file: Cart.js:46 ~ Cart ~ cart.items:", cart.items);

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Update Quantity</h1>
            <p>Do you want to change the quantity?</p>
            <p>Currently In Stock: {quantityStock}</p>
            <div className="modalButtons">
              <input
                type="number"
                value={quantity}
                min={1}
                max={quantityStock}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                className="deleteButton"
                onClick={handleQuanitySubmit}
                type="submit"
              >
                Submit
              </button>
              <button className="keepButton" onClick={closeModal}>
                No (Keep Quantity)
              </button>
            </div>
          </div>
        </div>
      )}
      {sessionUser ? (
        cart.items && cart.items.length > 0 ? (
          cart.items.map((frog) => (
            <div key={frog.id}>
              <div>{frog.name}</div>
              <div>{frog.price}</div>
              <div>{frog.quantity}</div>
              <div>Order Price: {frog.price * frog.quantity}</div>
              <div>
                <img
                  className="landingImage"
                  src={`${frog.pictureUrl}`}
                  alt={frog.name}
                />
              </div>
              <button
                onClick={() => {
                  handleEditQuantity();
                  setQuantity(frog.quantity);
                  setQuantityFrogId(frog.id);
                  setQuantityStock(frog.stock);
                }}
              >
                Edit Quantity
              </button>
              <button onClick={() => handleDeleteFrog(frog.id)}>
                Delete Frog
              </button>
            </div>
          ))
        ) : (
          <div>You have no frogs in your cart</div>
        )
      ) : null}
      <div>
        {sessionUser && cart.items && cart.items.length > 0 ? (
          <div>
            <div>Order Total: {calculateOrderTotal(cart.items)}</div>
          </div>
        ) : (
          null
        )}
      </div>
      <button onClick={handleCheckOut}>Checkout</button>
    </div>
  );
}

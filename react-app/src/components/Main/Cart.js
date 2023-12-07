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
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";

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

  return (
    <div className="CartContainer">
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Update Quantity</h1>
            <p>Do you want to change the quantity?</p>
            <p>Currently In Stock: {quantityStock}</p>
            <div className="modalButtons">
              <input
                type="number"
                className="quantityInput"
                value={quantity}
                min={1}
                max={quantityStock}
                onChange={(e) => {
                  const enteredValue = e.target.value;
                  // Ensure the entered value is within the allowed range
                  const newValue = Math.min(Math.max(enteredValue, 1), quantityStock);
                  setQuantity(newValue);
                }}
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
            <div key={frog.id} className="cartContainer">
              <div>
                <img
                  className="FrogCardImage"
                  src={`${frog.pictureUrl}`}
                  alt={frog.name}
                />
              </div>
              <div className="frogInfoContainer">
              <div>Name: {frog.name}</div>
              <div>Price: {frog.price}</div>
              <div>Quantity: {frog.quantity}</div>
              <div>Order Price: {frog.price * frog.quantity}</div>
              </div>
              <button
              className="cartButtons"
                onClick={() => {
                  handleEditQuantity();
                  setQuantity(frog.quantity);
                  setQuantityFrogId(frog.id);
                  setQuantityStock(frog.stock);
                }}
              >
                Edit Quantity
              </button>
              <button className="cartButtons" onClick={() => handleDeleteFrog(frog.id)}>
                Delete Frog
              </button>
            </div>
          ))
        ) : (
          <h2>You have no frogs in your cart</h2>
        )
      ) : <OpenModalButton
      buttonText="Log In to view your Cart"
      modalComponent={<LoginFormModal />}
      customClassName="custom-modal-button"
      className="custom-modal-button"
    />}
      <div>
        {sessionUser && cart.items && cart.items.length > 0 ? (
          <div>
            <h2>Order Total: {calculateOrderTotal(cart.items)}</h2>
          </div>
        ) : (
          null
        )}
      </div>
      {sessionUser && cart.items && cart.items.length > 0 ? <button className="cartButtons" onClick={handleCheckOut}>Checkout</button> : null}
    </div>
  );
}

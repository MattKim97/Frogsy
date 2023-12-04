import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteFrogThunk,
  getAllFrogsThunk,
  getFrogThunk,
} from "../../store/frogs";
import { useState } from "react";
import { useRef } from "react";
import { addToCartThunk } from "../../store/cart";

export default function Frog() {
  const history = useHistory();
  const { frogId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const frogs = Object.values(useSelector((state) => state.frogs));
  console.log("🚀 ~ file: Frog.js:13 ~ Frog ~ frogs:", frogs);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      try {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      } catch (e) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }, [dispatch]);

  if (!frogs) {
    return null;
  }

  const frog = frogs.find((frog) => frog.id === +frogId);

  console.log("🚀 ~ file: Frog.js:16 ~ Frog ~ frog:", frog);

  if (!frog) {
    return null;
  }

  const handleEdit = () => {
    history.push(`/frogs/${frog.id}/edit`);
  };

  const handleAddToCart = async () => {
    const response = await dispatch(addToCartThunk(frog.id));
    if (!response.errors) {
      history.push('/cart');
    } else {
      console.error('Failed to add frog to cart');
    }
  };


  const handleDeleteKeep = async () => {
    const response = await dispatch(deleteFrogThunk(frog.id));
    if (response) {
      history.push(`/frogs`);
    }
  };

  const handleDelete = () => {
    openModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this Frog?</p>
            <div className="modalButtons">
              <button className="deleteButton" onClick={handleDeleteKeep}>
                Yes (Delete Frog)
              </button>
              <button className="keepButton" onClick={closeModal}>
                No (Keep Frog)
              </button>
            </div>
          </div>
        </div>
      )}
      <div>{frog.name}</div>
      <div> {frog.species}</div>
      <div>
        <img src={`${frog.pictureUrl}`} alt={frog.name} />
      </div>

      <div> {frog.gender}</div>

      <div> {frog.age}</div>

      <div> {frog.price}</div>

      <div> {frog.stock}</div>

      <div> {frog.description}</div>

      <div> {frog.category}</div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {sessionUser ? sessionUser.id == frog.owner_id ? (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : null : null}
    </div>
  );
}

import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteFrogThunk, getAllFrogsThunk } from "../../store/frogs";
import { useState } from "react";
import { useRef } from "react";
import { addToCartThunk } from "../../store/cart";
import { setUser } from "../../store/session";

export default function Frog() {
  const history = useHistory();
  const { frogId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const frogs = Object.values(useSelector((state) => state.frogs));
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const [quantity, setQuantity] = useState(1);
  const [favorited, setFavorited] = useState(false);

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

  if (!frog) {
    return null;
  }

  const handleEdit = () => {
    history.push(`/frogs/${frog.id}/edit`);
  };

  const handleAddToCart = async () => {
    if (quantity > frog.stock) {
      if (frog.stock === 0) {
        window.alert("This frog is out of stock");
      } else {
        window.alert(`There are only ${frog.stock} of this frog left in stock`);
      }
      return;
    }
    const response = await dispatch(addToCartThunk(frog.id, quantity));
    if (!response.errors) {
      history.push("/cart");
    } else {
      console.error("Failed to add frog to cart");
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

  const handleFavorite = async () => {
    if (sessionUser.favorites.includes(frog.id)) {
      const res = await fetch(`/api/frogs/${frog.id}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ frogId: frog.id }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setFavorited(false);
        dispatch(setUser(updatedUser));
      }
    } else {
      const res = await fetch(`/api/frogs/${frog.id}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ frogId: frog.id }),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setFavorited(true);
        dispatch(setUser(updatedUser));
      }
    }
  };
  return (
    <div className="">
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this Frog?</p>
            <div className="modalButtons">
              <button
                className="deleteButton"
                style={{ marginLeft: "20px" }}
                onClick={handleDeleteKeep}
              >
                Yes (Delete Frog)
              </button>
              <button
                className="keepButton"
                style={{ marginLeft: "20px" }}
                onClick={closeModal}
              >
                No (Keep Frog)
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="frogDetailsContainer">
        <div className="pokemonCard">
          <div className="pokemonCardHeader">
            <div className="pokemonCardLeftSide">
              <div>{frog.name}</div>
            </div>
            <div className="pokemonCardRightSide">
              <div>${frog.price}</div>
              <div>
                {frog.category === "big" ? (
                  <i className="fa-solid fa-magnifying-glass-plus orange"></i>
                ) : null}
                {frog.category === "small" ? (
                  <i className="fa-solid fa-magnifying-glass-minus pink"></i>
                ) : null}
                {frog.category === "happy" ? (
                  <i className="fa-solid fa-face-smile blue"></i>
                ) : null}
                {frog.category === "angry" ? (
                  <i className="fa-solid fa-face-angry red"></i>
                ) : null}
              </div>
            </div>
          </div>
          <div className="pokemonCardImageContainer">
            <img
              src={`${frog.pictureUrl}`}
              alt={frog.name}
              className="pokemonCardImage"
            />
          </div>
          <div className="pokemonCardDetailsContainer">
            <div className="pokemonCardDetails">Stock Left: {frog.stock}</div>
          </div>
          <div className="pokemonCardFrogDetails">
            <div>Species: {frog.species}</div>
            <div>Age: {frog.age}</div>
            <div>Category: {frog.category}</div>
          </div>
          <div className="pokemonCardDescription">
            <p>{frog.description}</p>
          </div>
        </div>
        <div className="frogDetailsButtons">
          <div className="addAndStar">
            <div>
            {sessionUser ? (
            sessionUser.id !== frog.owner_id ? (
              <div>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  className="frogDetailQuantityInput"
                  max={frog.stock}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            ) : null
          ) : null}
            </div>
            <div>
              {sessionUser ? (
                sessionUser.id !== frog.owner_id ? (
                  <button className="cartButtons" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                ) : null
              ) : null}
            </div>
            <div className="myLittleStar">
              {sessionUser ? (
                sessionUser.id !== frog.owner_id ? (
                  <div>
                    <i
                      onClick={handleFavorite}
                      className={`fa-star ${
                        sessionUser.favorites.includes(frog.id)
                          ? "fa-solid coloredStar"
                          : "fa-regular"
                      }`}
                    ></i>
                  </div>
                ) : null
              ) : null}
            </div>
          </div>
          {sessionUser ? (
            sessionUser.id === frog.owner_id ? (
              <div>
                <button className="cartButtons" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            ) : null
          ) : null}
          {sessionUser ? (
            sessionUser.id === frog.owner_id ? (
              <div>
                <button className="cartButtons" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
}

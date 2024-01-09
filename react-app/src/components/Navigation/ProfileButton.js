import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // const sessionUser = useSelector((state) => state.session.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const handleUserFrogs = () => {
    history.push("/myfrogs");
  };

  const handleSellFrog = () => {
    history.push("/frogs/new");
  };
  
  const handleFavorites = () => {
    history.push("/favorites");
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        {user ? (
          user.profilePictureUrl ? (
            <img
              className="userProfileImage"
              src={user.profilePictureUrl}
              alt="profile"
            />
          ) : (
            <i className="fas fa-user-circle" />
          )
        ) : (
          <i className="fas fa-user-circle" />
        )}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <button  className="navigationButtons" onClick={handleUserFrogs}>See My Frogs</button>
            <button className="navigationButtons" onClick={handleSellFrog}>Sell A Frog</button>
            <button className="navigationButtons" onClick={handleFavorites}>Favorited Frogs</button>
            <button className="logout-button navigationButtons" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              customClassName="navigationButtons"
              modalComponent={<LoginFormModal />}
            />
            <div style={{ height: "10px" }}></div>
            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              customClassName="navigationButtons"
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;

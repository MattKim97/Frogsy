import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';
import FrogCard from '../FrogCard';


export default function FavoritedFrogs() {
    
  const dispatch = useDispatch();

  const frogs = Object.values(useSelector(state => (state.frogs)));
  const sessionUser = useSelector(state => state.session.user)


  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }
  , [dispatch]);

  if (!frogs.length) {
    return null;
  }

  if (!sessionUser) {
    return null;
  }


  const favoritedFrogs = frogs.filter(frog => sessionUser.favorites.includes(frog.id));

  return (
    <div className='frogsContainer'>
      {sessionUser ? (
        favoritedFrogs.length > 0 ? (
            favoritedFrogs.map(frog => (
            <div key={frog.id}>
            <FrogCard frog={frog} />
          </div>
          ))
        ) : (
          <h2>You have not favorited any Frogs</h2>
        )
      ) : null}
    </div>
  );
        }

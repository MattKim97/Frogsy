import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';
import FrogCard from '../FrogCard';


export default function MyFrogs() {
    
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
  const myfrogs = frogs.filter(frog => frog.owner_id === sessionUser.id );

  return (
    <div className='frogsContainer'>
      {sessionUser ? (
        myfrogs.length > 0 ? (
          myfrogs.map(frog => (
            <div key={frog.id}>
            <FrogCard frog={frog} />
          </div>
          ))
        ) : (
          <div>You have no frogs for sale</div>
        )
      ) : null}
    </div>
  );
        }

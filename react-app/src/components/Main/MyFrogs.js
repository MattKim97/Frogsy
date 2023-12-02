import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';


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
    <div>
      {sessionUser ? (
        myfrogs.map(frog => (
          <div key={frog.id}>
            <div>{frog.name}</div>
            <div><img className="landingImage" src={`${frog.pictureUrl}`} alt={frog.name} /></div>
          </div>
        ))
      ) : null}
    </div>
  );
}

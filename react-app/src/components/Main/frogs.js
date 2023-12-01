import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';

export default function Frogs() {
  const dispatch = useDispatch();

  const frogs = Object.values(useSelector(state => (state.frogs)));

  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }
  , [dispatch]);

  if (!frogs.length) {
    return null;
  }


  return (
    <div>
      {frogs.map(frog => (
        <div>
          <div>{frog.name}</div>
          <div><img  className="landingImage" src={`${frog.pictureUrl}`}/> </div>
        </div>
      ))  
      }
    </div>
  )
}

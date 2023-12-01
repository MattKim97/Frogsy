import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';

export default function Happyfrogs() {

  const dispatch = useDispatch();

  const frogs = Object.values(useSelector(state => (state.frogs)));

  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }
  , [dispatch]);

  if (!frogs.length) {
    return null;
  }

 const happyFrogs = frogs.filter(frog => frog.category === 'happy');


  return (
    <div>
      {happyFrogs.map(frog => (
        <div>
          <div>{frog.name}</div>
          <div><img  className="landingImage" src={`${frog.pictureUrl}`}/> </div>
        </div>
      ))  
      }
    </div>
  )
}

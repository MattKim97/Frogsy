import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';
import FrogCard from '../FrogCard';

export default function Angryfrogs() {

  const dispatch = useDispatch();

  const frogs = Object.values(useSelector(state => (state.frogs)));

  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }
  , [dispatch]);

  if (!frogs.length) {
    return null;
  }

  const angryFrogs = frogs.filter(frog => frog.category === 'angry');


  return (
    <div>
      {angryFrogs.map(frog => (
        <div key={frog.id}>
          <FrogCard frog={frog} />
        </div>
      ))  
      }
    </div>
  )
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';
import FrogCard from '../FrogCard';

export default function Smallfrogs() {
  const dispatch = useDispatch();

  const frogs = Object.values(useSelector(state => (state.frogs)));

  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }
  , [dispatch]);

  if (!frogs.length) {
    return null;
  }

  const smallFrogs = frogs.filter(frog => frog.category === 'small');
  
  return (
    <div className='frogsCateContainer'>
      <h1>Peruse our Little Frogs</h1>
    <div className='frogsContainer'>
      {smallFrogs.map(frog => (
        <div key={frog.id}>
          <FrogCard frog={frog} />
        </div>
      ))  
      }
    </div> 
    </div>
  )
}

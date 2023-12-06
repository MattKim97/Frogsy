import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';
import FrogCard from '../FrogCard';

export default function Bigfrogs() {
  const dispatch = useDispatch();

  const frogs = Object.values(useSelector(state => (state.frogs)));
  
  
  
  useEffect(() => {
    dispatch(getAllFrogsThunk());
  }
  , [dispatch]);
  
  if (!frogs.length) {
    return null;
  }
  const bigFrogs = frogs.filter(frog => frog.category === 'big');

  return (
    <div className='frogsCateContainer'>
      <h1>Peruse our Big Frogs</h1>
    <div className='frogsContainer'>
      {bigFrogs.map(frog => (
        <div key={frog.id}>
          <FrogCard frog={frog} />
        </div>
      ))  
      }
    </div> 
    </div>
  )
}

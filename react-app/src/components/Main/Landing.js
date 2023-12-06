import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFrogsThunk } from '../../store/frogs';
import FrogCard from '../FrogCard';


export default function Landing() {
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
    <div className='AboutUsContainer'>
     <h2>About us!</h2>
     <p>Welcome to Frogsy, your ultimate destination for the enchanting world of frogs! As devoted enthusiasts of these remarkable amphibians, we take pride in offering a diverse selection of exquisite frogs for those who share our passion. At Frogsy, our mission is to connect frog lovers with these captivating creatures through responsible breeding practices and the highest standards of care. Browse our collection of handpicked frog species, each uniquely beautiful and guaranteed to make a delightful addition to your home or collection. Whether you're a seasoned frog enthusiast or a newcomer to the world of amphibians, Frogsy is your trusted source for acquiring these incredible creatures. Explore our website, and let Frogsy be your gateway to the mesmerizing and wondrous realm of frogs.
</p>
<img src='https://frogsyimg.s3.us-west-1.amazonaws.com/landingimagefrog.webp' alt='frogsy' className='frogsyImage'></img>
    </div>
  )
}

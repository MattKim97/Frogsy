import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Categories() {

    const history = useHistory()

    const onclickSmallFrogs = () => {
        history.push('/frogs/small')
    }
    const onclickBigFrogs = () => {
        history.push('/frogs/big')
    }
    const onclickHappyFrogs = () => {
        history.push('/frogs/happy')
    }
    const onclickAngryFrogs = () => {
        history.push('/frogs/angry')
    }
    const onclickAllFrogs = () => {
        history.push('/frogs')
    }
  return (
    <div className='categoriesContainer'>
      <div className='categoriesHeaderContainer'>
        <h2>Categories</h2>
      </div>
      <div className='buttonContainer'>
      <button  className="categoryButtons" onClick={onclickBigFrogs}><i className="fa-solid fa-magnifying-glass-plus"></i> Big Frogs</button>
      <button className="categoryButtons" onClick={onclickSmallFrogs}> <i className="fa-solid fa-magnifying-glass-minus"></i>Small Frogs</button>
      <button className="categoryButtons" onClick={onclickHappyFrogs}><i className="fa-solid fa-face-smile"></i> Happy Frogs</button>
      <button className="categoryButtons" onClick={onclickAngryFrogs}> <i className="fa-solid fa-face-angry"></i>Angry Frogs</button>
      <button className="categoryButtons" onClick={onclickAllFrogs}><i className="fa-solid fa-frog"></i> All Frogs</button>
      </div>
    </div>
  )
}

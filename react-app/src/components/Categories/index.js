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
  return (
    <div>
        <h2>Categories</h2>
      <button onClick={onclickBigFrogs}>Big Frogs</button>
      <button onClick={onclickSmallFrogs}>Small Frogs</button>
      <button onClick={onclickHappyFrogs}>Happy Frogs</button>
      <button onClick={onclickAngryFrogs}>Angry Frogs</button>
    </div>
  )
}

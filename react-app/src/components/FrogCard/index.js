import React from 'react'
import { Link } from 'react-router-dom'

export default function FrogCard({frog}) {

    const imageUrl = frog.pictureUrl
  return (
    <div className='FrogCardContainer'>
        <Link to={`/frogs/${frog.id}`}>
            <div>
                <img className='FrogCardImage' src={imageUrl} alt={frog.name} />
                <div className='FrogCardName'>{frog.name}</div>
                <div className='FrogCardPrice'>${frog.price}</div>
            </div>
        </Link>
      
    </div>
  )
}

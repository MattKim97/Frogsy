import React from 'react'
import { Link } from 'react-router-dom'
import './FrogCard.css'

export default function FrogCard({frog}) {

    const imageUrl = frog.pictureUrl
  return (
    <div className='FrogCardContainer'>
        <Link to={`/frogs/${frog.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='FrogCardStyle'>
                <img  className="FrogCardImageMain" src={imageUrl} alt={frog.name} />
                <div className='FrogCardName'>Name: {frog.name}</div>
                <div className='FrogCardPrice'>Price: ${frog.price}</div>
            </div>
        </Link>
      
    </div>
  )
}

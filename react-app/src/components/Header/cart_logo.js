import React from 'react'
import { useHistory } from 'react-router-dom';

export default function CartLogo() {
    const history = useHistory()

    function cart () {
        history.push('/cart')
    }
  return (
    <div className='classLogoContainer' onClick={cart}>
      <i className="fa-solid fa-cart-shopping"></i>
    </div>
  )
}

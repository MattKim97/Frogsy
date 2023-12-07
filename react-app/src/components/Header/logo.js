import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Logo() {
  const history = useHistory()
  function home () {
   history.push('/')
  }
  return (
    <div className='LogoContainer' onClick={home}>
      <img className='myLogo' src='https://frogsyimg.s3.us-west-1.amazonaws.com/Comic_Sans.png' alt='logo' />
    </div>
  )
}

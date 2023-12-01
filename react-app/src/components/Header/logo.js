import React from 'react'
import { useHistory } from 'react-router-dom';

export default function Logo() {
  const history = useHistory()
  function home () {
   history.push('/')
  }
  return (
    <div className='LogoContainer' onClick={home}>
 <h1>Frogsy</h1>
    </div>
  )
}

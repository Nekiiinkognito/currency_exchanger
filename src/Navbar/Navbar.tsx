import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navBarMain'>
        <Link to="/">Converter</Link>
        <Link to="/favorite">Exchange rates</Link>
    </div>
  )
}

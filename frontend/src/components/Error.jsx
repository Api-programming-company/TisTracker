import React from 'react'
import { Link } from 'react-router-dom'
const Error = ({ error , link}) => {
  return (
    <div className='error-container'>
      <div className="error-image"></div>
      <div className="h4">{error}</div>
        <Link className='btn btn-primary' to={link}>Volver al Inicio</Link>
    </div>
  )
}

export default Error

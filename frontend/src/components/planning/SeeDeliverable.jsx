import React from 'react'

const SeeDeliverable = ({index,deliverable}) => {
  return (
    <div className="deliverable-item" key={index}>
      <p className='text-neutral-black'>{index}.</p>
      <p className='text-neutral-600'>{deliverable.name}</p>
    </div>
  )
}

export default SeeDeliverable

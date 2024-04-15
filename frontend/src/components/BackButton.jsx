import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({destination = "/"}) => {
  return (
    <div className='flex'>
        <Link to={destination}
            className='flex items-center bg-green-500 text-white px-4 py-2 rounded-md'>
            <BsArrowLeft className='text-2xl mr-2' />
        </Link>
    </div>
  )
}

export default BackButton
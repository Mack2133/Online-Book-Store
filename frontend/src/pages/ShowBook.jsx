import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBook = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({})

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/api/book/${id}`)
    .then(response => {
      setBook(response.data)
      setLoading(false)
    }).catch(error => {
      console.log(error)
      setLoading(false)
    })
  },[])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Book Details</h1>
    {
      loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-gray-200 bg-slate-50 rounded-xl w-full  p-4'>
          <div className='my-4'>
          <span className='text-xl mr-4 text-gray-800'>Id: </span>
          <span className='text-xl'>{book._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-800'>Title: </span>
          <span className='text-xl'>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-800'>Author: </span>
          <span className='text-xl'>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-800'>Published Year</span>
          <span className='text-xl'>{book.publishedYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-800'>Create Time: </span>
          <span className='text-xl'>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-800'>Update Time: </span>
          <span className='text-xl'>{new Date(book.updatedAt).toString()}</span>
        </div>
        </div>
      )
    }
    </div>
  )
}

export default ShowBook
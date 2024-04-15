import React, {useEffect, useState} from 'react'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'


const DeleteBook = () => {
  const [loading, setLoading] = useState(false)
  const [book, setBook] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:5555/api/book/${id}`)
      .then(response => {
        setBook(response.data)
      }).catch(error => {
        console.log(error)
      })
  }, [])

  const handleDelete = () => {
    setLoading(true)
    axios.delete(`http://localhost:5555/api/book/${id}`)
      .then(response => {
        navigate('/')
        setLoading(false)
      }).catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {
        loading ? <Spinner /> : " "
      }
      <div className="flex flex-col border-2 border-gray-200 bg-slate-50 rounded-xl w-full p-4">
        <h1 className="text-2xl text-red-600 pb-5">Are you sure you want to delete this book?</h1>
        <div>
          <h2 className="text-xl">Title: <span className='ps-2'>{book.title}</span></h2>
          <h2 className="text-xl">Author: <span className='ps-2'>{book.author}</span></h2>
          <h2 className="text-xl">Published: <span className='ps-2'>{book.publishedYear}</span></h2>
        </div>
        <div className="flex justify-between pt-5">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleDelete}>Delete</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteBook
import { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/api/book/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishedYear(response.data.publishedYear);
        setLoading(false);
      }).catch(error => {
        alert('Book not found');
        console.log(error);
        setLoading(false);
      })
  }, [])

  const handleSubmit = (e) => {
    const book = {
      title,
      author,
      publishedYear
    }

    setLoading(true);
    axios.put(`http://localhost:5555/api/book/${id}`, book)
      .then(response => {
        setLoading(false);
        navigate('/')
      }).catch(error => {
        console.log(error);
        setLoading(false);
      })
  }
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {
        loading ? <Spinner /> :  " "
      }
      <div className="flex flex-col border-2 border-gray-200 bg-slate-50 rounded-xl w-full p-4">
        <div className="my-4">
          <label htmlFor="title" className="text-xl mr-4 text-gray-800">Title: </label>
          <input type="text" required id="title" className="text-xl ring-1 ring-gray-300 flex-1 rounded-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="my-4">
          <label htmlFor="author" className="text-xl mr-4 text-gray-800">Author: </label>
          <input type="text" required id="author" className="text-xl ring-1 ring-gray-300 rounded-sm" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="my-4">
          <label htmlFor="publishedYear" className="text-xl mr-4 text-gray-800">Published Year: </label>
          <input type="text" required id="publishedYear" className="text-xl ring-1 ring-gray-300 rounded-sm" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} />
        </div>
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md">Update</button>
    </div>
  </div>
  )
}

export default EditBook;
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/api/book')
      .then((response) => {
        setBooks(response.data.data.reverse());
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  return (
    <div className="p-4">
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create' className='flex items-center bg-green-500 text-white px-4 py-2 rounded-md'>
          <MdOutlineAddBox className='text-2xl mr-2' />
          Add Book
        </Link>
      </div>
        {
          loading ? (
            <Spinner />
          ) : (
            <table className='w-full border-separate border-spacing-2'>
              <thead>
                <tr>
                  <th className='border border-gray-400 px-4 py-2 rounded-md'>No</th>
                  <th className='border border-gray-400 px-4 py-2 rounded-md'>Title</th>
                  <th className='border border-gray-400 px-4 py-2 rounded-md max-md:hidden'>Author</th>
                  <th className='border border-gray-400 px-4 py-2 rounded-md max-md:hidden'>Published Year</th>
                  <th className='border border-gray-400 px-4 py-2 rounded-md'>Operations</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => {
                  return (
                    <tr key={book._id} className='h-8'>
                      <td className='border border-gray-400 px-4 py-2 text-center rounded-md'>
                        {index + 1}
                      </td>
                      <td className='border border-gray-400 px-4 py-2 rounded-md'>
                        {book.title}
                      </td>
                      <td className='border border-gray-400 px-4 py-2 rounded-md max-md:hidden'>
                        {book.author}
                      </td>
                      <td className='border border-gray-400 px-4 py-2 rounded-md max-md:hidden'>
                        {book.publishedYear}
                      </td>
                      <td className='border border-gray-400 px-4 py-2 rounded-md text-center'>
                        <div className='flex justify-center gap-x-4'>
                            <Link to={`/books/details/${book._id}`} className='text-blue-500'> 
                              <BsInfoCircle className='text-2xl text-green-800' /> 
                            </Link>
                            <Link to={`/books/edit/${book._id}`} className='text-blue-500'> 
                              <AiOutlineEdit className='text-2xl text-yellow-300' />
                            </Link>
                            <Link to={`/books/delete/${book._id}`} className='text-blue-500'> 
                              <MdOutlineDelete className='text-2xl text-red-800' />
                            </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )
        }
      </div>
  )
}

export default Home;

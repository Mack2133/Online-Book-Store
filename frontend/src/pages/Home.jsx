import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


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
      <div className='flex items-center justify-between'>
        <h1 className='my-8 text-3xl'></h1>
        <Link to='/books/create' className='flex items-center px-4 py-2 text-white bg-green-500 rounded-md'>
          <MdOutlineAddBox className='mr-2 text-2xl' />
          Add Book
        </Link>
      </div>
        {
          loading ? (
            <Spinner />
          ) : (
            <TableContainer borderRadius={"10px"}>
            <Table className='w-full border-separate border-spacing-2' color={"black"}>
            <TableCaption placement='top' fontSize={30} fontFamily={"poppins"} fontWeight={"bold"}>Book List</TableCaption>
              <Thead size='sm' textColor={"white"} fontWeight={"bold"} bgColor={"gray"} >
                <Tr>
                  <Th textColor={"white"}>No</Th>
                  <Th textColor={"white"}>Title</Th>
                  <Th textColor={"white"}>AuThor</Th >
                  <Th textColor={"white"}>Published Year</Th>
                  <Th textColor={"white"}>Operations</Th>
                </Tr>
              </Thead>
              <Tbody>
                {books.map((book, index) => {
                  return (
                    <Tr key={book._id} className='h-8'>
                      <Td className='px-4 py-2 text-center rounded-md'>
                        {index + 1}
                      </Td>
                      <Td className='px-4 py-2 rounded-md'>
                        {book.title}
                      </Td>
                      <Td hideBelow='md'>
                        {book.author}
                      </Td>
                      <Td hideBelow='md'>
                        {book.publishedYear}
                      </Td>
                      <Td className='px-4 py-2 text-center rounded-md'>
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
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          )
        }
      </div>
  )
}

export default Home;

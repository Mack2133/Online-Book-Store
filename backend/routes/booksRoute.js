import express from 'express';
import {Book} from '../models/bookmodels.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ) {
            return res.status(400).send({message: "Please fill all the fields"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        }

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({message: "Error in Saving Book"});
    }
})

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({message: "Error in Fetching Book"});
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params

    try {
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({message: "Error in Fetching Book"});
    }
})

router.put('/:id', async (req, res) => {
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ) {
            return res.status(400).send({message: "Please fill all the fields"});
        }

        const { id } = req.params;

        const book = await Book.findByIdAndUpdate(id, req.body)

        if(!book) {
            return res.status(404).json({message: "Book not found"});
        }

        return res.status(200).json(book);

    } catch (error) {
        console.log("Error", error);
        return res.status(500).send({message: "Error in Updating Book"});
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({message: "Book not found"});
        }

        return res.status(200).json({message: "Book Deleted Successfully"});

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({message: "Error in Deleting Book"});
    }
})

export default router;
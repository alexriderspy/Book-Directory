const router = require('express').Router();
const books = require('./books');

let booksDirectory = books;

router.get('/books', function (req, res) {
    res.send(booksDirectory);
});

router.get('/books/:id', function (req, res) {
    const {id}=req.params
    const book=booksDirectory.find(b=> b.isbn===id)
    if (!book) return res.status(404).send('Book does not exist')
    res.send(book)
});

router.post('/books', function (req, res) {
    const {
        title,
        isbn,
        pages
    }=req.body
    //stores the values passed in body in these variables
    const bookExist = booksDirectory.find(b=>b.isbn===isbn)
    if(bookExist) res.send('Book already exists')

    const book={
        title,
        isbn,
        pages
    }
    booksDirectory.push(book)
    res.send(book)

})

router.put('/books/:id', function(req,res){
    const {id} = req.params
    const {
        title, //cannot update isbn
        pages

    }=req.body

    const book=booksDirectory.find(b=>b.isbn ===id)
    if(!book) res.send('Book does not exist')
    
    const updateField=(val,prev)=> !val?prev:val

    const updatedBook={
        ...book,
        title: updateField(title,book.title),
        pages: updateField(pages,book.pages)

    }

    const bookIndex=booksDirectory.findIndex(b=>b.isbn === id)
    booksDirectory.splice(bookIndex,1,updatedBook)
    res.send(updatedBook)

})

router.delete('/books/:id', function(req,res){
    const {id} = req.params
    const {
        title,
        isbn,
        pages
    }=req.body
    //here is role of body Parser

    let book=booksDirectory.find(b=>b.isbn === id)
    if(!book) return res.send('Book does not exist')

    booksDirectory=booksDirectory.filter(b=>b.isbn!==id)

    return res.send(book)
})

module.exports = router;

//remember to change the type of data passed in body in postman
//to json else wont work
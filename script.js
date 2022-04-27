const books = [
  {
    id: 1,
    title: 'The Power of Focus',
    author: 'Mark Victor Hansen',
  },
];

const bookListSection = document.querySelector('#book-list');

function renderBookList(bookList) {
  bookListSection.innerHTML = bookList
    .map(
      (book) => `<div class= "book-container"><div class="book-description"><p class="title"> "${book.title}" by </p>
      <p class="author">${book.author}</p> </div>
      <button data-id=${book.id} class="remove">Remove</button></div>`,
    )
    .join('');
}

function saveBookToStorage(bookList) {
  localStorage.setItem('bookList', JSON.stringify(bookList));
}

function getBookListFromLocalStorage() {
  const bookListFromLocalStorage = localStorage.getItem('bookList');
  if (bookListFromLocalStorage) {
    return JSON.parse(bookListFromLocalStorage);
  }
  return books;
}

renderBookList(getBookListFromLocalStorage());

const addBookForm = document.querySelector('#add-book');
addBookForm.addEventListener('submit', function setVal(event) {
  event.preventDefault();
  const title = event.target.querySelector('#title').value;
  const author = event.target.querySelector('#author').value;
  const bookList = getBookListFromLocalStorage();
  const id = bookList.length + 1;
  bookList.push({
    title,
    author,
    id,
  });
  this.reset();
  renderBookList(bookList);
  saveBookToStorage(bookList);
});

bookListSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    const bookList = getBookListFromLocalStorage();
    const bookListFiltered = bookList.filter((book) => book.id !== +id);
    renderBookList(bookListFiltered);
    saveBookToStorage(bookListFiltered);
  }
});

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class AwesomeBooks {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    const id = this.books.length + 1;
    const book = new Book(title, author, id);
    this.books.push(book);
    this.#save();
  }

  #addBooks(books) {
    books.forEach((book) => {
      this.addBook(book.title, book.author);
    });
  }

  getBooks() {
    return this.books;
  }

  #save() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  load() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) {
      this.#addBooks(books);
    }
  }

  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.#save();
  }
}
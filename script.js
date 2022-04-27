class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.books = [];
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

const awesomeBooks = new AwesomeBooks();
awesomeBooks.load();
if (awesomeBooks.getBooks().length < 1) {
  awesomeBooks.addBook('The Power of Focus', 'Mark Victor Hansen');
}

const bookListSection = document.querySelector('#book-list');

function renderBookList() {
  bookListSection.innerHTML = awesomeBooks
    .getBooks()
    .map(
      (book, index) => `
        <article class="book ${index % 2 === 0 ? 'dark' : ''}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <button data-id=${book.id} class="remove">Remove</button>
        </article>`,
    )
    .join('');
}
renderBookList();

const addBookForm = document.querySelector('#add-book');
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = event.target.querySelector('#title').value;
  const author = event.target.querySelector('#author').value;
  awesomeBooks.addBook(title, author);
  this.reset();
  renderBookList();
});

bookListSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    awesomeBooks.deleteBook(+id);
    renderBookList();
  }
});

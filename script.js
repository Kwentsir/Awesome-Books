class AwesomeBooks {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.books = [];
  }

  addBook(title, author) {
    const id = this.books.length + 1;
    const book = new AwesomeBooks(title, author, id);
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
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  load() {
    const books = JSON.parse(localStorage.getItem("books"));
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
  awesomeBooks.addBook("The Power of Focus", "Mark Victor Hansen");
}

const bookListSection = document.querySelector("#book-list");

function renderBookList() {
  bookListSection.innerHTML = awesomeBooks
    .getBooks()
    .map(
      (book, index) => `
        <article class="book ${index % 2 === 0 ? "dark" : ""}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <button data-id=${book.id} class="remove">Remove</button>
        </article>`
    )
    .join("");
}
renderBookList();

const addBookForm = document.querySelector("#add-book");
addBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = event.target.querySelector("#title").value;
  const author = event.target.querySelector("#author").value;
  awesomeBooks.addBook(title, author);
  this.reset();
  renderBookList();
});

bookListSection.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    const { id } = event.target.dataset;
    awesomeBooks.deleteBook(+id);
    renderBookList();
  }
});

const dateSection = document.querySelector(".date");
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  time: "numeric",
};
dateSection.innerHTML = new Date().toLocaleDateString("en-US", dateOptions);

const bookList = document.querySelector(".list-link");
const addNew = document.querySelector(".add-new");
const contact = document.querySelector(".contact");

const bookSection = document.querySelector(".books-list");
const addNewSection = document.querySelector(".form");
const contactSection = document.querySelector(".contact-container");

bookList.addEventListener("click", () => {
  bookSection.style.display = "block";
  addNewSection.style.display = "none";
  contactSection.style.display = "none";
});

addNew.addEventListener("click", () => {
  bookSection.style.display = "none";
  addNewSection.style.display = "block";
  contactSection.style.display = "none";
});

contact.addEventListener("click", () => {
  bookSection.style.display = "none";
  addNewSection.style.display = "none";
  contactSection.style.display = "block";
});

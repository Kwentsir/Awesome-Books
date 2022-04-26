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
      (book) => `<p class="title">${book.title}</p>
            <p>${book.author}</p>
            <button data-id=${book.id} class="remove">Remove</button>
            <hr>`).join("");
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
addBookForm.addEventListener('submit', function (event) {
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

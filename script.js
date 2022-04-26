const books = [
  {
    id: 1,
    title: "The Power of Focus",
    author: "Mark Victor Hansen",
  },
];

const bookListSection = document.querySelector("#book-list");

function renderBookList(bookList) {
  bookListSection.innerHTML = bookList
    .map(
      (book) => `
<p class="title">${book.title}</p>
            <p>${book.author}</p>
            <button data-id=${book.id} class="remove">Remove</button>
            <hr>`
    )
    .join("");
}

function saveBookToStorage(bookList) {
  localStorage.setItem("bookList", JSON.stringify(bookList));
}

function getBookListFromLocalStorage() {
  const bookListFromLocalStorage = localStorage.getItem("bookList");
  if (bookListFromLocalStorage) {
    return JSON.parse(bookListFromLocalStorage);
  }
  return books;
}

renderBookList(getBookListFromLocalStorage());

"use strict";

const myLibrary = [];

// NEW BOOK CONSTRUCTOR
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  const allBooks = document.querySelector(".books");
  allBooks.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
        <h2>${book.title}</h2>
        <p class='author'>by <span>${book.author}</span></p>
        <p class='pages'>${book.pages} pages</p>
        <button class='read'>${
          book.read === true ? "Read" : "Not read"
        }</button>
        <button class='edit'>Edit</button>
      </div>`
  );
}

// SHOW NEW BOOK FORM
const btnOpenModal = document.querySelector(".btn-add");
const modal = document.querySelector(".popup");
const btnCloseModal = document.querySelector(".btn-close");
const appWelcome = document.querySelector(".welcome");

// open form
btnOpenModal.addEventListener("click", function () {
  modal.showModal();
  modal.classList.add("open-popup");
});
// close form
btnCloseModal.addEventListener("click", function () {
  modal.close();
  modal.classList.remove("open-popup");
});

// ADDING NEW BOOK TO LIBRARY
const btnAddBook = document.querySelector(".add-book");
const allInputs = document.querySelectorAll("input");

btnAddBook.addEventListener("click", function (e) {
  let valid = 0;
  const title = document.querySelector("#title").value,
    author = document.querySelector("#author").value,
    pages = document.querySelector("#pages").value,
    checkbox = document.querySelector("#read");
  const newBook = new Book(title, author, pages, checkbox.checked);

  // check for form validation
  allInputs.forEach((input) => {
    if (input.value !== "" || input.value === true || input.value === false)
      valid++;
  });
  if (valid < 3) {
    e.preventDefault();
  } else {
    addBookToLibrary(newBook);
    appWelcome.style.display = "none";
    document.querySelector("form").reset();
    modal.close();
  }
});

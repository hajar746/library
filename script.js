"use strict";

const myLibrary = [];

// NEW BOOK CONSTRUCTOR ////////////////
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.addBook = function () {
  myLibrary.push(this);
  const allBooks = document.querySelector(".books");
  allBooks.insertAdjacentHTML(
    "beforeend",
    `<div class="card">
          <img src="imgs/close.png" alt="close-form" class="btn-delete"/>
          <h2>${this.title}</h2>
          <p class='author'>by <span>${this.author}</span></p>
          <p class='pages'>${this.pages} pages</p>
          <button class='read'>${
            this.read === true ? "Read" : "Not read"
          }</button>
          <button class='edit'>Edit</button>
        </div>`
  );
};

Book.prototype.readStatus = function () {
  if (this.read === true) {
    this.read = false;
  }
  if (this.read === false) {
    this.read = true;
  }
};

// SHOW NEW BOOK FORM ////////////
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

// ADDING NEW BOOK TO LIBRARY USING FORM INFO ///////////
const btnAddBook = document.querySelector(".add-book");
const allInputs = document.querySelectorAll("input");
const errorMesg = document.querySelector(".error");
const form = document.querySelector("form");

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
  if (valid > 3) {
    newBook.addBook();
    appWelcome.style.display = "none";
    form.reset();
    modal.close();
    errorMesg.style.display = "none";
  } else {
    e.preventDefault();
    errorMesg.style.display = "block";
  }
  console.log(myLibrary);
});

// MARKING BOOK AS READ/NOT READ /////////
document.addEventListener("click", function (e) {
  const target = e.target.closest(".read");
  if (!target) return;

  if (target && target.textContent === "Read") {
    target.textContent = "Not read";
    target.classList.add("not-read");
    target.style.display = "block";
  } else {
    target.textContent = "Read";
    target.classList.add("already-read");
    target.classList.remove("not-read");
    target.style.display = "block";
  }

  console.log(myLibrary);
});

// DELETING A BOOK /////////
document.addEventListener("click", function (e) {
  const target = e.target.closest(".btn-delete");
  const book = e.target.closest(".card");
  const bookTitle = e.target.closest(".title");

  if (target) {
    const index = myLibrary.findIndex((book) => book.title === bookTitle);
    myLibrary.splice(index, 1);
    book.remove();
  }
});

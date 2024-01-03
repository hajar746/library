"use strict";

const myLibrary = [];
const allBooks = document.querySelector(".books");

// NEW BOOK CONSTRUCTOR ////////////////
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

// PROTOTYPE METHOD TO ADD A NEW BOOK /////////////////
Book.prototype.addBook = function () {
  myLibrary.push(this);
  allBooks.insertAdjacentHTML(
    "beforeend",
    `<div class="card" data-book='${this.title}'>
          <h2 class='title'>${this.title}</h2>
          <p class='author'>by <span>${this.author}</span></p>
          <p class='pages'>${this.pages} pages</p>
          <button class='read'>${
            this.read === true ? "Read" : "Not read"
          }</button>
          <button class='btn-delete'>Delete</button>
        </div>`
  );
};

// PROTOYPE METHODS TO CHANGE READ STATUS ////////////////
Book.prototype.alreadyRead = function () {
  this.read = true;
};
Book.prototype.notRead = function () {
  this.read = false;
};

// SHOW NEW BOOK FORM /////////////////////
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

// ADDING NEW BOOK TO LIBRARY USING FORM INFO /////////////////////////
const btnAddBook = document.querySelector(".add-book");
const allInputs = document.querySelectorAll("input");
const errorMesg = document.querySelector(".error");
const form = document.querySelector("form");
const numInput = document.querySelector("#pages");
const numError = document.querySelector(".num-error");

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
    errorMesg.style.display = "block";
    e.preventDefault();
  }
  if (valid > 3) {
    newBook.addBook();
    appWelcome.style.display = "none";
    form.reset();
    modal.close();
    errorMesg.style.display = "none";
  }
  console.log(myLibrary);
});

// MARKING BOOK AS READ/NOT READ ////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    const target = e.target.closest(".read");
    if (!target) return;
    const bookCard = e.target.closest(".card");
    const index = myLibrary.findIndex(
      (book) => book.title === bookCard.dataset.book
    );
    if (target && target.textContent === "Read") {
      target.textContent = "Not read";
      myLibrary[index].notRead();
    } else if (target && target.textContent === "Not read") {
      target.textContent = "Read";
      myLibrary[index].alreadyRead();
    }
  });
});

// DELETING A BOOK ///////////////////
document.addEventListener("click", function (e) {
  const target = e.target.closest(".btn-delete");
  const bookCard = e.target.closest(".card");

  if (target) {
    // finding index of book that needs to be deleted
    const index = myLibrary.findIndex(
      (book) => book.title === bookCard.dataset.book
    );
    myLibrary.splice(index, 1);
    bookCard.remove();
    // display welcome message
    if (allBooks.childNodes.length === 0) {
      appWelcome.style.display = "block";
    }
  }
});

"use strict";

const myLibrary = [
  { title: "The Book Theif", author: "idontknow", pages: 1500, read: true },
  { title: "Atomic Habits", author: "jamessomthing", pages: 500, read: false },
];

// NEW BOOK FUNCTIONS
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("The Alchemist", "idontknow", 345, true);
addBookToLibrary(book1);

console.log(myLibrary);

function displayBooks() {
  myLibrary.forEach((book) => {
    console.log(book);
  });
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
  // appWelcome.style.display = "none";
});
// close form
btnCloseModal.addEventListener("click", function () {
  modal.close();
  modal.classList.remove("open-popup");
});

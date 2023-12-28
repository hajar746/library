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
const btnAddBook = document.querySelector(".btn-add");
const form = document.querySelector(".popup");
const btnCloseForm = document.querySelector(".btn-close");
const appWelcome = document.querySelector(".welcome");

// open form
btnAddBook.addEventListener("click", function () {
  form.classList.add("open-popup");
  appWelcome.style.display = "none";
});
// close form
btnCloseForm.addEventListener("click", function () {
  form.classList.remove("open-popup");
});

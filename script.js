
// Constant Declarations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addNewBookButton = document.querySelector("#addBookButton");
const dialogToAddNewBook = document.querySelector(".dialogNewBook");
const submitButton = document.querySelector("#submitButton");
const myLibrary = Array.from(document.querySelectorAll(".book-container")).reverse();
const bookContainerWidth = document.querySelector(".shelf").clientWidth;
const bookWidth = 80;


// Function decralations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (String, String) -> Element
// To produce element with class 
function createElement(container, className) {
    const part = document.createElement(container);
    part.classList.add(className);  
    return part;  
}



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

//(String, String, String, String, String, String, String) -> Element
// Return Book Element using div and class name 
function createBookElement(container, bookClass, coverClass, pagesClass, backClass, sideBookClass, topSideClass) {
    const book      = createElement(container, bookClass); 
    book.appendChild(createElement(container, coverClass));    
    book.appendChild(createElement(container,pagesClass));
    book.appendChild(createElement(container, backClass));
    book.appendChild(createElement(container, sideBookClass));
    book.appendChild(createElement(container, topSideClass));    
    return book;
}
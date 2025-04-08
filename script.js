
// Constant Declarations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addNewBookButton      = document.querySelector("#addBookButton");
const dialogToAddNewBook    = document.querySelector(".dialogNewBook");
const submitButton          = document.querySelector("#submitButton");
const shelfBookContainer    = Array.from(document.querySelectorAll(".book-container")).reverse();
const bookContainerWidth    = document.querySelector(".shelf").clientWidth;
const bookWidth             = 80;
const myLibrary             = []


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

// (String, String, Number, String) -> Object
// To create Book object that keeps book title, author name, number of pages and status of read
function Book(title, author, pages, status) {
    if(!new.target) {
        throw Error("You have to use new keyword for Book construction");
    }
    this.title = title;
    this.author = author;
    this.id     = crypto.randomUUID();
    this.pages = pages;
    this.status = status;
    this.width = 75;
    this.element = createBookElement("div", "book", "cover", "pages", "back", "book-side", "top-pages");
}


// (Book, ArrayOfBookContainer) -> ()
// To add Book into an array of container element
function addBookToShelf(book, library , containerWidth) {
    const maxBookPerShelf = Math.floor(containerWidth/book.width);       
    library.forEach(container => {
        if(container.childElementCount <= maxBookPerShelf) {
            container.appendChild(book.element);
            return;        
        }          
    });    
}
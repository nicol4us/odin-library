
// Constant Declarations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addNewBookButton      = document.querySelector("#addBookButton");
const dialogToAddNewBook    = document.querySelector(".dialogNewBook");
const submitButton          = document.querySelector("#submitButton");
const shelfBookContainer    = Array.from(document.querySelectorAll(".book-container")).reverse();
const bookContainerWidth    = document.querySelector(".shelf").clientWidth;
const bookWidth             = 80;
const myLibrary             = []
const harryPotter           = new Book("Harry Potter", "JK Rowling", 500, "red", "read");


// Function decralations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (String, String) -> Element
// To produce element with class 
function createElement(container, className, color) {
    var part = document.createElement(container);
    part.classList.add(className);  
    part.style.background = color;
    return part;  
}


//(Object, String) -> Element
// Return Book Element using div and class name 
function createBookElement(part, color) {
    const book      = createElement(part.container, part.class, ""); 
    book.appendChild(createElement(part.container, part.cover, color));    
    book.appendChild(createElement(part.container,part.pages, "white"));
    book.appendChild(createElement(part.container, part.back, color));
    book.appendChild(createElement(part.container, part.bookSide, color));
    book.appendChild(createElement(part.container, part.topPage, "white"));   
    return book;
}

// (String, String, Number, String) -> Object
// To create Book object that keeps book title, author name, number of pages and status of read
function Book(title, author, pages, color, status) {
    if(!new.target) {
        throw Error("You have to use new keyword for Book construction");
    }
    this.title = title;
    this.author = author;
    this.id     = crypto.randomUUID();
    this.pages = pages;
    this.color = color
    this.status = status;
    this.width = 75;    
    this.part = {  
        class: "book",      
        container: "div",
        cover: "cover",
        pages: "pages",
        back: "back",
        bookSide: "book-side",
        topPage: "top-pages",
        titleClass: "book-title",
        authorClass: "book-author"
    }
    this.element = createBookElement(this.part, color);
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


// (Array, Arrayy, Number) -> ()
// To display all of book
function displayAllBook(library, bookContainer, bookContainerWidth) {
    library.forEach(book => {
        addBookToShelf(book, bookContainer, bookContainerWidth);
    })
}



// Function Executions
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

addNewBookButton.addEventListener("click", function() {
    dialogToAddNewBook.showModal();
})


submitButton.addEventListener("click", function(event) {
    var bookTitle     = document.querySelector("#book-title").value;
    var bookAuthor    = document.querySelector("#author-name").value;
    var bookPages     = document.querySelector("#number-pages").value;
    var bookColor     = document.querySelector("#color").value;
    var status        = document.querySelector("#status").value;
    var book = new Book(bookTitle,bookAuthor,bookPages,bookColor ,status);
    myLibrary.push(book);
    event.preventDefault();
    displayAllBook(myLibrary,shelfBookContainer,bookContainerWidth);  
    dialogToAddNewBook.close();      
})

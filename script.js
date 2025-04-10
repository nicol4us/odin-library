
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

// (String, String, String, String) -> Element
// To create one container for two element
function createDialogSection(div,upperClass, leftElement, leftClass, rightElement, rightClass) {
    var container = createElement(div, upperClass, "");
    var leftSection = createElement(div, leftClass, "");
    leftSection.textContent = leftElement;
    var rightSection = createElement("button", rightClass, "");
    rightSection.textContent = rightElement;
    container.appendChild(leftSection);
    container.appendChild(rightSection);
    return container;
}

// (Object, String, String) -> Element
// To produce Element using dialog as tag
function createBookDialog(self) {
    var dialog = document.createElement(self.part.dialog);
    var title = createDialogSection(self.part.container, "dialog-section", self.title, "title-section-dialog", "Edit", "edit-title-button");
    var author = createDialogSection(self.part.container, "dialog-section", self.author, "author-section-dialog", "Edit", "edit-author-button");
    var status = createDialogSection(self.part.container, "dialog-section", self.status, "status-section-dialog", "Edit", "edit-status-button");
    dialog.appendChild(title);
    dialog.appendChild(author);
    dialog.appendChild(status);
    return dialog;
}


//(Object) -> Element
// Return Book Element 
function createBookElement(self) {
    const book      = createElement(self.part.container, self.part.class, ""); 
    const cover     = createCoverBook(self.part, self.title, self.author, self.color )
    book.appendChild(cover);    
    book.appendChild(createElement(self.part.container,self.part.pages, "white"));
    book.appendChild(createElement(self.part.container, self.part.back, self.color));
    book.appendChild(createElement(self.part.container, self.part.bookSide, self.color));
    book.appendChild(createElement(self.part.container, self.part.topPage, "white"));
    book.appendChild(createBookDialog(self));   
    return book;
}

// (Object, String, String) -> Element
// To create Element of cover Book which include Book title and author name
function createCoverBook(part, bookTitle, bookAuthor, color) {
    var cover   = createElement(part.container, part.cover, color);
    var title   = createElement(part.container, part.titleClass, "");
    title.textContent = bookTitle;
    var author  = createElement(part.container, part.authorClass, "");
    author.textContent = bookAuthor;
    cover.appendChild(title);
    cover.appendChild(author);
    return cover;
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
    this.width = 85;    
    this.part = {  
        class: "book",      
        container: "div",
        dialog: "dialog",
        cover: "cover",
        pages: "pages",
        back: "back",
        bookSide: "book-side",
        topPage: "top-pages",
        titleClass: "book-title",
        authorClass: "book-author"
    }
    var self = this;
    this.element = createBookElement(self);
    this.bookDialog = this.element.querySelector(this.part.dialog);     
    self.element.addEventListener("click", function() {
        self.bookDialog.showModal();
    })   
}


// (Book, ArrayOfBookContainer) -> ()
// To add Book into an array of container element
function addBookToShelf(book, library , containerWidth) {
    const maxBookPerShelf = Math.floor(containerWidth/book.width); 
    console.log(maxBookPerShelf)      
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



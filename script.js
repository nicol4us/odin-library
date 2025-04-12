
// Constant Declarations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addNewBookButton      = document.querySelector("#addBookButton");
const dialogToAddNewBook    = document.querySelector(".dialogNewBook");
const submitButton          = document.querySelector("#submitButton");
const shelfBookContainer    = Array.from(document.querySelectorAll(".book-container")).reverse();
const bookContainerWidth    = document.querySelector(".shelf").clientWidth;
const myLibrary             = []
const harryPotter           = new Book("Harry Potter", "JK Rowling", 500, "red", "read");


// Function decralations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// (String, String, String, String) -> Element
// To produce element with class, color and text 
function createPart(container, className, color, text) {
    var part = document.createElement(container);
    part.classList.add(className);  
    part.style.background = color;
    part.textContent = text;
    return part;  
}


// (Object, String, String) -> Element
// To produce Element using dialog as tag
function createBookDialog(self) {
    var dialog = createPart("dialog", "dialog-book");
    /*
    var container = createPart(self.part.container, "dialog-section");
    var buttonContainer = createPart(self.part.container, "dialog-button-container");
    var title = createPart(self.part.container, "dialog-text", "", "Book Title : " + self.title);
    var editTitle = createPart("button", "edit-button", "", "Edit Title");
    var author = createPart(self.part.container, "dialog-text","" ,"Author Name : " + self.author);
    var editAuthor = createPart("button", "edit-button", "", "Edit Name");
    var status = createPart(self.part.container, "dialog-text", "", "Reading status : " + self.status);
    var editStatus = createPart("button", "edit-button", "", "Edit Status");
    */
    //var closeDialog = createPart("button", "dialog-close-button", "", "Close");
    /*
    var removeBook = createPart("button", "dialog-delete-button", "", "Remove Book");   
    
    container.appendChild(title);
    container.appendChild(editTitle);
    container.appendChild(author);
    container.appendChild(editAuthor);
    container.appendChild(status);
    container.appendChild(editStatus);    
    buttonContainer.appendChild(closeDialog);
    buttonContainer.appendChild(removeBook);  
    */  
    //dialog.appendChild(container);
    var closeBtn = document.createElement("button");
    closeBtn.textContent = "OK"
    dialog.appendChild(closeBtn);
    return dialog;

}


//(Object) -> Element
// Return Book Element 
function createBookElement(self) {
    const book      = createPart(self.part.container, self.part.class, ""); 
    const cover     = createCoverBook(self.part, self.title, self.author, self.color )
    book.appendChild(cover);    
    book.appendChild(createPart(self.part.container,self.part.pages, "white"));
    book.appendChild(createPart(self.part.container, self.part.back, self.color));
    book.appendChild(createPart(self.part.container, self.part.bookSide, self.color));
    book.appendChild(createPart(self.part.container, self.part.topPage, "white"));
    book.appendChild(createBookDialog(self));   
    return book;
}

// (Object, String, String) -> Element
// To create Element of cover Book which include Book title and author name
function createCoverBook(part, bookTitle, bookAuthor, color) {
    var cover   = createPart(part.container, part.cover, color);
    var title   = createPart(part.container, part.titleClass, "", bookTitle);    
    var author  = createPart(part.container, part.authorClass, "", bookAuthor);    
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
    this.width  = 120;      
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
    this.bookDialog = this.element.querySelector(".dialog-book"); 
    this.closeDialogButton = this.element.querySelector("button");   
    self.element.addEventListener("click", function() {
        self.bookDialog.showModal();
    })
    self.closeDialogButton.addEventListener("click", function() {              
        self.bookDialog.close(); 
        console.log("Is book dialog open: " + self.bookDialog.open)       
    })
     
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




// Constant Declarations
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const addNewBookButton      = document.querySelector("#addBookButton");
const dialogToAddNewBook    = document.querySelector(".dialogNewBook");
const submitButton          = document.querySelector("#submitButton");
const shelfBookContainer    = Array.from(document.querySelectorAll(".book-container")).reverse();
const bookContainerWidth    = document.querySelector(".shelf").clientWidth;
const formNewBook           = document.querySelector("#formAddNewBook");
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



// (Element Array) -> Element
// To append all Array element into one element
function appendAllElement(parent, arrayChildElement) {
    arrayChildElement.forEach(child => parent.appendChild(child));
    return parent;
}

// (String, String, String, String) -> Element
// To create dialog book section that consist 3 element
function createBookDialogSection(container, sectionName, titleName, buttonName ) {    
    var firstPart = createPart(container, "part", "", sectionName);
    var secondPart = createPart(container, "part", "", titleName);
    var thirdPart = createPart("button", "part", "", buttonName);
    var mainContainer = appendAllElement(createPart(container, "section-part-dialog"), [firstPart, secondPart, thirdPart]);
    return mainContainer;
}

// (Event, Object) -> ()
// To set X position of dialog element according from click event position
function setXPositionDialog(event, self) {
    var xPosition = event.clientX;
    var dialogWidth = self.bookDialog.clientWidth;
    self.bookDialog.style.left = (xPosition - (dialogWidth / 2)) + "px";
}

// (Event, Object) -> ()
// To set Y position of dialog element according from click event position
function setYPositionDialog(event, self) {
    var yPosition = event.clientY;
    var dialogHeight = self.bookDialog.clientHeight;
    self.bookDialog.style.top = (yPosition - (dialogHeight / 2)) + "px";
}

// (Array, Object) -> ()
// To remove object inside array
function removeBook(array, self) {
    array.forEach((item, index) => {
        if(item.id === self.id) {
            array.splice(index,1);
        }
    })
}

// (Object, String, String) -> Element
// To produce Element using dialog as tag
function createBookDialog(self) {
    var dialog = createPart("dialog", "dialog-book");    
    var top = createBookDialogSection(self.part.container, "Book Title", ": " + self.title, "Edit Title");
    var middle = createBookDialogSection(self.part.container, "Author Name", ": "+ self.author, "Edit Name");
    var bottom = createBookDialogSection(self.part.container, "Reading Status", ": " + self.status, "Edit Status");    
    var closeDialog = createPart("button", "dialog-close-button", "", "Close");    
    var removeBook = createPart("button", "dialog-delete-button", "", "Remove Book");
    var container = appendAllElement(createPart(self.part.container,"book-dialog-section"), [top, middle, bottom]);
    var buttonContainer = appendAllElement(createPart(self.part.container, "dialog-button-container"), [closeDialog, removeBook]);     
    dialog.appendChild(container);    
    dialog.appendChild(buttonContainer);
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
    this.titlePart = {
        classTitle: "label",
        titleLabel: "Book Title",
        classContent: "title-content",
        buttonType : "button",
        buttonClass : "edit-title-button",
        buttonContent: "Edit Title"
    }
    var self = this;
    this.element = createBookElement(self);
    this.bookDialog = createBookDialog(self);
    this.closeDialogButton = this.bookDialog.querySelector(".dialog-close-button"); 
    this.removeBookButton = this.bookDialog.querySelector(".dialog-delete-button");
    self.element.addEventListener("click", function(event) {
        self.bookDialog.showModal();
        setXPositionDialog(event,self);
        setYPositionDialog(event, self);
    })
    self.closeDialogButton.addEventListener("click", function() {              
        self.bookDialog.close();                
    })
    self.removeBookButton.addEventListener("click", function() {
        self.element.remove();
        self.bookDialog.remove();        
        removeBook(myLibrary, self);        
    })
     
}


// (Book, ArrayOfBookContainer) -> ()
// To add Book into an array of container element
function addBookToShelf(book, library , containerWidth) {    
    const maxBookPerShelf = Math.floor(containerWidth/book.width);         
    library.forEach(container => {
        if(container.childElementCount <= maxBookPerShelf) {
            container.appendChild(book.element);
            container.appendChild(book.bookDialog);
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
    formNewBook.reset();    
})



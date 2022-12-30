/* Initial var */

const submitBook = document.querySelector('.confirm')
const bookTitle = document.querySelector('input[id="title"]')
const bookAuthor = document.querySelector('input[id="author"]')
const numberPages = document.querySelector('input[id="pages"]')
const shelf = document.querySelector('.shelf')

function resetInput() {
    bookTitle.value = "";
    bookAuthor.value = "";
    numberPages.value = "";
}


/* Setting for modal */

const modal = document.getElementById('modal');

window.onclick = function(e) {
    if (e.target === modal) {/* Targeting the div aka the grey background, NOT the actual modal window */
        modal.style.display = 'none';
        resetInput()
    }
}


/* Add book button */

function turnOnModal() {
    modal.style.display = 'block';
}

const addBook = document.querySelector('.add-book');

addBook.addEventListener('click', turnOnModal)


/* Building the shelf */

const myShelf = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.page = pages;
        this.read = read;
    }
}


/* Submit book */

let bookDisplay;
let id;
let removeBook;

function preventDefault(event) {
    event.preventDefault()
}

function rearrange() {
    const currentBooks = document.querySelectorAll(".wrapper > div")
    const removeButtons = document.querySelectorAll(".wrapper > .delete") 
    currentBooks.forEach((book) => {
        for (let i = 0; i < myShelf.length; i+=1 ) {
            if (book.textContent === myShelf[i].title) {
                id = i;
                book.setAttribute("data-id", `${id}`)
            }
        }
        removeButtons.forEach((button) => {
            if (button.getAttribute("for") === book.textContent) {
                button.setAttribute("data-id", `${book.getAttribute("data-id")}`)
            }
        })  
    })
}


function deleteBook(event) {
    preventDefault(event);
    myShelf.splice(event.target.getAttribute("data-id"), 1);
    event.target.parentNode.remove();
    rearrange()
}

function findId() {
    for (let i = 0; i < myShelf.length; i+=1 ) {
        if (myShelf[i].title === bookTitle.value) {
            id = i;
        }
    }
}

function createInterface() {
    const bookWrapper = document.createElement("div");
    bookWrapper.classList.add('wrapper');

    /* Book */
    bookDisplay = document.createElement("div");
    bookDisplay.textContent = bookTitle.value;
    bookDisplay.setAttribute("data-id", `${id}`);
    bookDisplay.classList.add("book");

    /* Front cover */
    const frontCover = document.createElement("ul");
    frontCover.classList.add("hardcover-front");
    const liCov1 = document.createElement("li");
    const coverDesign = document.createElement("div");
    coverDesign.textContent = "cac tao ne";
    coverDesign.classList.add("cover-design");
    const liCov2 = document.createElement("li");

    liCov1.appendChild(coverDesign);
    frontCover.appendChild(liCov1);
    frontCover.appendChild(liCov2);
    bookDisplay.appendChild(frontCover);

    /* Pages */
    const bookPages = document.createElement("ul");
    bookPages.classList.add("book-pages");
    const liPage1 = document.createElement("li");
    const liPage2 = document.createElement("li");
    liPage2.textContent = "Page content"
    const liPage3 = document.createElement("li");
    const liPage4 = document.createElement("li");
    const liPage5 = document.createElement("li");

    bookPages.appendChild(liPage1);
    bookPages.appendChild(liPage2);
    bookPages.appendChild(liPage3);
    bookPages.appendChild(liPage4);
    bookPages.appendChild(liPage5);
    bookDisplay.appendChild(bookPages);

    /* Back cover */
    const backCover = document.createElement("ul");
    backCover.classList.add("hardcover-back");
    const liCov3 = document.createElement("li");
    const liCov4 = document.createElement("li");
    backCover.appendChild(liCov3);
    backCover.appendChild(liCov4);
    bookDisplay.appendChild(backCover);

    /* Book spine */
    const bookSpine = document.createElement("ul");
    bookSpine.classList.add("book-spine");
    const liSpine1 = document.createElement("li");
    const liSpine2 = document.createElement("li");
    bookSpine.appendChild(liSpine1);
    bookSpine.appendChild(liSpine2);
    bookDisplay.appendChild(bookSpine);

    /* Remove button */
    removeBook = document.createElement("button");
    removeBook.classList.add("delete");
    removeBook.setAttribute("type", "submit");
    removeBook.setAttribute("data-id", `${id}`);
    removeBook.setAttribute("for", `${bookDisplay.textContent}`);
    removeBook.textContent = "Remove";
    removeBook.addEventListener('click', deleteBook)

    
    bookWrapper.appendChild(bookDisplay);
    bookWrapper.appendChild(removeBook);

    shelf.appendChild(bookWrapper);
}

function createBook(event) {
    preventDefault(event);
    myShelf.push(new Book(bookTitle.value, bookAuthor.value, numberPages.value));
    findId();
    createInterface();
    resetInput();
    rearrange();
    console.log(myShelf)
    console.log(shelf)
}

submitBook.addEventListener('click', createBook)


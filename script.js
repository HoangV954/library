/* Initial var */
const submitBook = document.querySelector('.confirm')
const bookTitle = document.querySelector('input[id="title"]')
const bookAuthor = document.querySelector('input[id="author"]')
const numberPages = document.querySelector('input[id="pages"]')
const bookmarkText = document.querySelector('textarea[id="bookmark-text"]')
const bookmarkPage = document.querySelector('input[id="bookmark-page"]')
const fileCover = document.querySelector('input[id="book-cover"]')

const modal = document.getElementById('modal');

const shelf = document.querySelector('.shelf')

let slideWidth;

function resetInput() {
    bookTitle.value = "";
    bookAuthor.value = "";
    numberPages.value = "";
    bookmarkText.value = "";
    bookmarkPage.value = "";
    fileCover.value = "";
}

/* ================================================================================================ */

/* Setting for modal */

window.onclick = (e) => {
    if (e.target === modal) {/* Targeting the div aka the grey background, NOT the actual modal window */
        modal.style.display = 'none';
        resetInput()
    }
}

/* ================================================================================================ */

/* Auto scroll to the right when a new element is added */

// Options for the observer (which mutations to observe)

// eslint-disable-next-line no-unused-vars
const config = { attributes: true, childList: true, subtree: true };

// eslint-disable-next-line no-unused-vars
function callback(mutationList, observer) {/* By default mutation list is always inserted automatically as a series of change made to the document that calls it. Observer will be attached below (auto as well). */
    mutationList.forEach((mutation) => {
        switch(mutation.type) {
            case 'childList':
                
                break;
            case 'attributes':
                
                break;
            case 'subtree':
                
                break;
            default:
                
        }
    })
}

const observer = new MutationObserver(callback);
observer.observe(shelf, config)
// Alternative could be just checking for the length

// Below code is not working since toggling classes modifies both child and attribute
/* shelf.addEventListener("DOMNodeInserted", () => { 
    shelf.scrollLeft = shelf.scrollWidth;
}) */

/* ================================================================================================ */

/* Add book button */

function turnOnModal() {
    modal.style.display = 'block';
}

const addBooks = document.querySelectorAll('.add-book');

addBooks.forEach((addBook) => {
    addBook.addEventListener('click', turnOnModal);
    
})   

/* ================================================================================================ */

/* Building the shelf */

const myShelf = [];

class Book {
    constructor(title, author, pages, bookmarkT, bookmarkP, file) {
        this.title = title;
        this.author = author;
        this.page = pages;
        this.bookmarkT = bookmarkT;
        this.bookmarkP = bookmarkP;
        this.file = file;
    }
}

/* ============================================================================================== */

/* Submit book */

let bookDisplay;
let id;
let removeBook;
let bookStatus;
const totalSta = [];
const randomDarkColors = ["cadetblue", "blueviolet", "burlywood", "coral", "darkslateblue", "deeppink", "goldenrod", "indigo", "lightsalmon", "lightslategrey"]


function preventDefault(event) {
    event.preventDefault()
}




/* Delete Book ------------------------------------------------------------------ */

function deleteBook(event) {
    preventDefault(event);

    if (event.target.tagName === "I") {
        myShelf.splice(event.target.parentNode.getAttribute("data-id"), 1);
        for(let i = 0; i < totalSta.length; i+=1) {
            if (totalSta[i][0] === Number(event.target.parentNode.getAttribute("data-id"))) {
                totalSta.splice(event.target.parentNode.getAttribute("data-id"), 1);
            }
        }
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
    } else {
        myShelf.splice(event.target.getAttribute("data-id"), 1);
        for(let i = 0; i < totalSta.length; i+=1) {
            if (totalSta[i][0] === Number(event.target.getAttribute("data-id"))) {
                totalSta.splice(event.target.getAttribute("data-id"), 1);
            }
        }
        event.target.parentNode.parentNode.parentNode.parentNode.remove()
    }
    
    // eslint-disable-next-line no-use-before-define
    rearrange()
    // eslint-disable-next-line no-use-before-define
    progressUpdate()
}

/* Find ID ---------------------------------------------------------------------- */

function findId(book) {
    for (let i = 0; i < myShelf.length; i+=1 ) {
        if (myShelf[i].title === book.value) {
            id = i;
        }
    }
}

/* Extract Progress --------------------------------------------------------------- */


/* Next time create a more unique name like footer-progress */
const readBar = document.querySelector("progress");
const labelReadBar = document.querySelector("#footer-label")
const inProgress = document.querySelector(".progressing");
const notRead = document.querySelector(".untouched");
const colorReel = [];

function progressUpdate() {
    const progressArray = [];
    for (let i = 0; i < totalSta.length; i += 1) {
        progressArray.push(totalSta[i][1]);
    }
    readBar.setAttribute("value", (progressArray.filter((a) => a === "read").length*100)/progressArray.length)
    labelReadBar.textContent = `Read: ${((progressArray.filter((a) => a === "read").length*100)/progressArray.length).toFixed(0)}%`
    inProgress.textContent = `In progress: ${progressArray.filter((a) => a === "in-progress").length}`
    notRead.textContent = `Untouched: ${progressArray.filter((a) => a === "no").length}`
}

/* Create Interface for books---------------------------------------------------- */

function createInterface() {
    
    const bookWrapper = document.createElement("div");
    bookWrapper.classList.add('wrapper');
     
    /* Book */
    bookDisplay = document.createElement("div");
    /* bookDisplay.textContent = bookTitle.value; */
    bookDisplay.setAttribute("data-id", `${id}`);
    bookDisplay.setAttribute("title", `${bookTitle.value}`)
    bookDisplay.classList.add("book");

    /* Front cover */
    const frontCover = document.createElement("ul");
    frontCover.classList.add("hardcover-front");
    const liCov1 = document.createElement("li");
    const liCov2 = document.createElement("li");

    const coverDesign = document.createElement("div");
    coverDesign.classList.add("cover-design");

    const audioLists = document.getElementsByTagName('audio')
    frontCover.addEventListener('mouseenter', () => {
        audioLists[0].play()
    })
    bookDisplay.addEventListener('mouseleave', () => {
        audioLists[1].play()
    })
    /* Create image for upload */
    
    if (fileCover.files[0]) {
        const img = document.createElement('img');
        img.setAttribute("src", `${URL.createObjectURL(fileCover.files[0])}`);
        const image = URL.createObjectURL(fileCover.files[0]);
        coverDesign.style.background = `url(${image})`;
        coverDesign.style.backgroundSize = "cover";
    } else {
        const coverColor = randomDarkColors[Math.floor(Math.random()*randomDarkColors.length)]
        
        if (colorReel.length >= 1) {
            
            if (colorReel[colorReel.length - 1] === coverColor) {
                const newRandomColors = (randomDarkColors.slice(0, randomDarkColors.indexOf(coverColor))).concat(randomDarkColors.slice(randomDarkColors.indexOf(coverColor) + 1, randomDarkColors.length))
                const newCoverColor = newRandomColors[Math.floor(Math.random()*newRandomColors.length)]          
                coverDesign.style.background = `${newCoverColor}`
                colorReel.push(newCoverColor) // important to push the new color instead of normal color 
            } else if (colorReel[colorReel.length - 1] !== coverColor){
                coverDesign.style.background = `${coverColor}`
                colorReel.push(coverColor)
            }
        } else {
            coverDesign.style.background = `${coverColor}`
            colorReel.push(coverColor)
        }   
        coverDesign.textContent = `${bookTitle.value}`
        
        
    }
    

    liCov1.appendChild(coverDesign);
    frontCover.appendChild(liCov1);
    frontCover.appendChild(liCov2);
    bookDisplay.appendChild(frontCover);

    /* Pages */
    const bookPages = document.createElement("ul");
    bookPages.classList.add("book-pages");
    const liPage1 = document.createElement("li");
    const liPage2 = document.createElement("li");
    /* liPage2.setAttribute('style', 'white-space: pre;');
    liPage2.textContent = "Page content \r\n"
    liPage2.textContent += "NEW line" */ /* => This is to go to a new line using textContent => All is necessary */
    const liPage3 = document.createElement("li");
    const bmarkPage3 = document.createElement("p");
    bmarkPage3.textContent = `${bookmarkText.value}`;
    bmarkPage3.classList.add("bookmark")

    const page3Footer = document.createElement("p")
    page3Footer.textContent = `${bookmarkPage.value}`;
    page3Footer.classList.add("bookmark-footer")

    liPage3.appendChild(bmarkPage3)
    liPage3.appendChild(page3Footer)

    const liPage4 = document.createElement("li");
    const liPage5 = document.createElement("li");

    /* Page 2 content */
    const liPage2Content = document.createElement("div")
    /* const title = document.createElement("p")
    title.classList.add("info-title")
    title.textContent = `Title: ${bookTitle.value}` */

    const author = document.createElement("p")
    author.classList.add("info-author")
    author.textContent = `Author: ${bookAuthor.value}`

    const pages = document.createElement("p")
    pages.classList.add("info-pages")
    pages.textContent = `Number of pages: ${numberPages.value}`

    liPage2Content.appendChild(author)
    liPage2Content.appendChild(pages)
    liPage2.appendChild(liPage2Content)


    /* Finishing pages */
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
    removeBook.setAttribute("for", `${bookTitle.value}`);
    const removeSymbol = document.createElement("i")
    removeSymbol.classList.add("fa-solid")
    removeSymbol.classList.add("fa-trash-can")
    removeBook.appendChild(removeSymbol)
    removeBook.addEventListener('click', (e) => {
        deleteBook(e, bookTitle)
    })

    /* Read Yet? */
    const readYet = document.createElement("button");
    readYet.classList.add("no")
    readYet.textContent = "Not yet read";

    readYet.setAttribute("id", "progress");
    readYet.setAttribute("data-id", `${id}`);
    readYet.setAttribute("for", `${bookTitle.value}`);

    readYet.addEventListener('click', (event) => {
        if (event.target.classList.contains("no")) {
            event.target.classList.toggle("in-progress");
            event.target.classList.toggle("no");
            // eslint-disable-next-line no-param-reassign
            event.target.textContent = "In Progress"
            
        } else if (event.target.classList.contains("in-progress")) {
            event.target.classList.toggle("read");
            event.target.classList.toggle("in-progress");
            // eslint-disable-next-line no-param-reassign
            event.target.textContent = "Finished"  
            
        } else if (event.target.classList.contains("read")) {
            event.target.classList.toggle("no");
            event.target.classList.toggle("read");
            // eslint-disable-next-line no-param-reassign
            event.target.textContent = "Not yet read"   
        }

        // eslint-disable-next-line no-use-before-define
        changeProgress(event.target)
        progressUpdate()
    })

    bookStatus = [id, readYet.classList[0], bookTitle.value]
    totalSta.push(bookStatus)
    
    /* Div for the 2 buttons */

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper");
    buttonsWrapper.appendChild(readYet);
    buttonsWrapper.appendChild(removeBook);
    
    /* The whole finished book */
    bookWrapper.appendChild(bookDisplay);
    bookWrapper.appendChild(buttonsWrapper)

    const bookLabel = document.createElement("label");
    bookLabel.setAttribute("for", `${id}`);
    bookLabel.appendChild(bookWrapper)

    const bookSlot = document.createElement("div");
    bookSlot.classList.add("book-slot")
    bookSlot.appendChild(bookLabel)

    const bookActive = document.createElement("input");
    bookActive.setAttribute("type", "radio")
    bookActive.setAttribute("id", `${id}`)
    bookActive.setAttribute("name", "book-activation")
    bookSlot.appendChild(bookActive);
    
    const carouselAdd = document.querySelector(".shelf > .add-book");

    shelf.appendChild(bookSlot)
    bookSlot.after(carouselAdd) /* Add book before the add */
}

/* Read Yet? Button function------------------------------------------------------ */

function changeProgress(curProgress) {
    for (let i = 0; i < totalSta.length; i+=1) {
        if (Number(curProgress.getAttribute("data-id")) === totalSta[i][0]) {
            totalSta[i][1] = curProgress.getAttribute("class")
        }
    }
    
}

/* Rearrange book and match their data info--------------------------------------------- */

function playAudio() {
    const audioLists = document.getElementsByTagName('audio');
    audioLists[0].play()
}

function rearrange() {
    const currentBooks = document.querySelectorAll(".wrapper > .book")
    const removeButtons = document.querySelectorAll(".buttons-wrapper > .delete") 
    const progressButtons = document.querySelectorAll(".buttons-wrapper > #progress")
    

    currentBooks.forEach((book) => {
        
        for (let i = 0; i < myShelf.length; i+=1 ) {
            if (book.getAttribute("title") === myShelf[i].title) {
                id = i;
                book.setAttribute("data-id", `${id}`)
            }
        }
        removeButtons.forEach((button) => {
            if (button.getAttribute("for") === book.getAttribute("title")) {
                button.setAttribute("data-id", `${book.getAttribute("data-id")}`)
            }
        })  

        progressButtons.forEach((progressButton) => {
            if (progressButton.getAttribute("for") === book.getAttribute("title")) {
                progressButton.setAttribute("data-id", `${book.getAttribute("data-id")}`)
                
            }
        })

        for (let i = 0; i < totalSta.length; i+=1) {
            if (book.getAttribute("title") === totalSta[i][2]) {
                totalSta[i][0] = id
            }
        }
    })
}

/* Check for duplicate */
let dupAlarm = 0

function checkDuplicate(target) {
    
    for (let i = 0; i < myShelf.length; i += 1) {
        if (myShelf[i].title === target) {
            let alertMsg = "The book already existed you illiterate swine! \r\n"
            alertMsg += "                   - Friendly neighbourhood spider"
            alert(alertMsg)
            dupAlarm += 1;
        }
    }
}

/* ----------------------------------------------------------------------------- */

function createBook(event) {
    if (bookTitle.value && bookAuthor.value) {/* Prevent default = also ignore required form */
        preventDefault(event);
        checkDuplicate(bookTitle.value)
        if (dupAlarm === 0) {
            myShelf.push(new Book(bookTitle.value, bookAuthor.value, numberPages.value, bookmarkText.value, bookmarkPage.value, fileCover.value)); 
            findId(bookTitle);
            createInterface();
            playAudio()
            resetInput();
            rearrange();
            progressUpdate()
            modal.style.display = 'none';
            shelf.scrollLeft = shelf.scrollWidth;
            dupAlarm = 0;
        } else {
            resetInput();
            modal.style.display = 'none';
            dupAlarm = 0;
        }
    } 
    
}

submitBook.addEventListener('click', createBook)

/* ================================================================================================ */

/* Cancel book */

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", (event) => {
    preventDefault(event);
    modal.style.display = 'none';
    resetInput()
})

/* ================================================================================================ */

/* Carousel */

const navButtons = document.querySelectorAll(".carousel");

navButtons.forEach((navButton) => {
    navButton.addEventListener("click", () => {
        slideWidth = shelf.getBoundingClientRect().width;
        shelf.scrollLeft += (navButton.classList[1] === "prev" ? -slideWidth : slideWidth);
    })
})

/* ================================================================================================ */

/* Demo */

function createDemo() {
    const demoProgressBtns = document.querySelectorAll("#progress-demo")
    const demoDeleteBtns = document.querySelectorAll(".delete-demo")
    const demoCovers = document.querySelectorAll("#frontcover-demo")
    const demoBooks = document.querySelectorAll("#wrapper-demo")

    totalSta.push([0, "in-progress", "The return of the King"], [1, "read", "The Dark Tower: The Gun Slinger"], [2, "no", "Harry Potter and the Goblet of Fire"])
    myShelf.push(({title: 'The return of the King'}),({title: "The Dark Tower: The Gun Slinger"}), {title: "Harry Potter and the Goblet of Fire"});

    const audioLists = document.getElementsByTagName('audio')

    demoCovers.forEach((frontCover) => {
        frontCover.addEventListener('mouseenter', () => {
            audioLists[0].play()
        })
    })
    
    demoBooks.forEach((demo) => {
        demo.addEventListener('mouseleave', () => {
            audioLists[1].play()
        })
    })
    

    demoProgressBtns.forEach((demoProgress) => {
        demoProgress.addEventListener('click', (event) => {
            if (event.target.classList.contains("no")) {
                event.target.classList.toggle("in-progress");
                event.target.classList.toggle("no");
                // eslint-disable-next-line no-param-reassign
                event.target.textContent = "In Progress"
                
            } else if (event.target.classList.contains("in-progress")) {
                event.target.classList.toggle("read");
                event.target.classList.toggle("in-progress");
                // eslint-disable-next-line no-param-reassign
                event.target.textContent = "Finished"  
                
            } else if (event.target.classList.contains("read")) {
                event.target.classList.toggle("no");
                event.target.classList.toggle("read");
                // eslint-disable-next-line no-param-reassign
                event.target.textContent = "Not yet read"   
            }
    
            // eslint-disable-next-line no-use-before-define
            changeProgress(event.target)
            progressUpdate()
        })
    })
    
    demoDeleteBtns.forEach((demoDelete) => {
        demoDelete.addEventListener('click', (event) => {

            if (event.target.tagName === "I") {
                myShelf.splice(event.target.parentNode.getAttribute("data-id"), 1);
                for(let i = 0; i < totalSta.length; i+=1) {
                    if (totalSta[i][0] === Number(event.target.parentNode.getAttribute("data-id"))) {
                        totalSta.splice(event.target.parentNode.getAttribute("data-id"), 1);
                    }
                }
                event.target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
                progressUpdate()
            } else {
                myShelf.splice(event.target.getAttribute("data-id"), 1);
                for(let i = 0; i < totalSta.length; i+=1) {
                    if (totalSta[i][0] === Number(event.target.getAttribute("data-id"))) {
                        totalSta.splice(event.target.getAttribute("data-id"), 1);
                    }
                }
                event.target.parentNode.parentNode.parentNode.parentNode.remove()
                progressUpdate()
            }
            rearrange()
            const demoCurrentBooks = document.querySelectorAll(".wrapper > .book")
            const demoRemoveButtons = document.querySelectorAll(".buttons-wrapper > .delete-demo") 
            const demoProgressButtons = document.querySelectorAll(".buttons-wrapper > #progress-demo")
        
    
            demoCurrentBooks.forEach((book) => {
            
                for (let i = 0; i < myShelf.length; i+=1 ) {
                    if (book.getAttribute("title") === myShelf[i].title) {
                        id = i;
                        book.setAttribute("data-id", `${id}`)
                    }
                }
                demoRemoveButtons.forEach((button) => {
                    if (button.getAttribute("for") === book.getAttribute("title")) {
                        button.setAttribute("data-id", `${book.getAttribute("data-id")}`)
                    }
                })  
    
                demoProgressButtons.forEach((progressButton) => {
                    if (progressButton.getAttribute("for") === book.getAttribute("title")) {
                        progressButton.setAttribute("data-id", `${book.getAttribute("data-id")}`)
                        
                    }
                })
    
                for (let i = 0; i < totalSta.length; i+=1) {
                    if (book.getAttribute("title") === totalSta[i][2]) {
                        totalSta[i][0] = id
                    }
                }
            })
            progressUpdate()
        })
    })
    
}

createDemo()




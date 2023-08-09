let sideList = document.querySelector('ol')
let sideMenu = document.querySelector('.sideMenu')
let menuIcons = document.querySelector('.menuIcons')
const content = document.querySelector('.content')
const chapterID = document.querySelector('h2')
let chapterHandler = document.querySelector('.chapters')
let input = document.querySelector('input')
let totalChpt = document.querySelector('.total')
    // let btn = document.querySelector('.btn')
const grid = document.querySelector('.grid-container')

let openMenu = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" height="40px" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>`

let closeMenu = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" fill ="white" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416zM128 256c0-6.7 2.8-13 7.7-17.6l112-104c7-6.5 17.2-8.2 25.9-4.4s14.4 12.5 14.4 22l0 208c0 9.5-5.7 18.2-14.4 22s-18.9 2.1-25.9-4.4l-112-104c-4.9-4.5-7.7-10.9-7.7-17.6z"/></svg>`

let menuState = 0
let control = ''
let count = 0
let currentVersion = './kjv.json'


function menuMgmt() {
    let sideMenu = document.querySelector('.sideMenu')
    if (!menuState) {
        menuIcons.innerHTML = openMenu
        menuState = 1
        sideMenu.style = 'left: -205px;'
    } else {
        menuIcons.innerHTML = closeMenu
        menuState = 0
        sideMenu.style = 'left: 0px;'

    }
}
menuMgmt()


let current_chapter = 1
let current_read = ''


menuIcons.addEventListener('click', menuMgmt)

function loadMenu() {
    let data = fetch(currentVersion)
    data.then(res => {
        res = res.json()
        return res
    }).then(content => {
        console.log(content.verses[31102])

        let menuVerses = content.verses

        let book = ''
        let chapterCount = 0
        let i = 0



        menuVerses.forEach(element => {
            let current_book = element.book_name
            current_book = current_book.toLowerCase()
            if (book != current_book && count === 1) {

                book = current_book
                let li = document.createElement('li')
                li.innerText = book
                sideList.append(li)



                setTimeout(console.log(book), 1000)

            }
        })


    })
}

loadMenu()

let impt = ''

function loadBook(kitabu, chpt) {
    // input.innerText = chpt
    console.log("Kitabu: " + kitabu);
    console.log("Chapter: " + chpt);

    // input.value = current_chapter


    count++
    kitabu = kitabu.toLowerCase()
    impt = kitabu
    let data = fetch('./web.json')
    data.then(res => {
        res = res.json()
        return res
    }).then(res => {
            // console.log(res);
            let verses = res['verses']
            let allbooks = []
            let book = ''
            let chapterCount = 0
            let i = 0



            verses.forEach(element => {

                let chapter = element.chapter
                let current_verse = element.verse
                let txt = element.text



                let current_book = element.book_name

                current_book = current_book.toLowerCase()


                // if (book != current_book && count === 1) {

                //     book = current_book
                //     let li = document.createElement('li')
                //     li.innerText = book
                //         // sideList.append(li)



                //     // console.log(book);

                // }

                function loadVerses(chpt) {
                    if (current_book === kitabu && chapter === chpt) {
                        chapterID.innerText = `${current_book} - ${chpt}`
                        control = current_book
                        let p = document.createElement('p')
                        p.innerHTML = `<sup>${current_verse}</sup>   ${txt}`
                        content.append(p)
                            // console.log(txt);
                    }

                }

                loadVerses(chpt)


                if (current_book === kitabu) {
                    let x = element.chapter

                    if (x > chapterCount) {
                        chapterCount = x

                    }
                }
            })

            // input.max = chapterCount
            // totalChpt.innerText = chapterCount
            grid.innerHTML = ''

            for (let i = 0; i < chapterCount; i++) {
                let container = document.createElement('div')
                container.className = 'grid-item'
                container.innerText = i + 1

                grid.append(container)


                container.addEventListener('click', () => {
                    // console.log("Woza");
                    let items = document.querySelectorAll('.grid-item')
                        // items.forEach(item => {
                        //     item.style = 'background: white; color: brown;'
                        // })
                    container.style = 'background:white;color:brown;'
                    let lbook = impt
                    let val = i + 1
                    val = Number(val)
                    content.innerHTML = ''
                    console.log("Val: " + val);
                    // current_chapter = val
                    // let current_read = lbook.toLowerCase()
                    console.log("Book: " + lbook);
                    loadBook(kitabu, val)
                        // items[i].style = 'background:white;color:white;'
                })


            }








            // sideList.style.overflowY = 'scroll'


        }

    )

}

loadBook("mark", 1)



function changeBook() {
    let bookList = document.querySelectorAll('li')

    bookList.forEach(el => {
        el.addEventListener('click', () => {

            let selectedBook = el.innerText
            selectedBook = selectedBook.toLowerCase()
            console.log("control : " + control)
            console.log("selected book: " + selectedBook)

            if (selectedBook != control) {
                content.innerHTML = ''

                loadBook(selectedBook, 1)
            }
        })
    })

}
setTimeout(changeBook, 2000)


setTimeout(() => {
    let btn = document.querySelector('button')
        // btn.addEventListener('click', () => {
        //     // console.log("Woza");
        //     let lbook = impt
        //     let val = input.value
        //     val = Number(val)
        //     content.innerHTML = ''
        //     console.log("Val: " + val);
        //     // current_chapter = val
        //     // let current_read = lbook.toLowerCase()
        //     console.log("Book: " + lbook);
        //     loadBook(impt, val)
        // })
}, 3000)
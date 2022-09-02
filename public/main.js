const addButton = document.getElementById("addItem")
const descriptionInput = document.getElementById("description")
const destinationInput = document.getElementById("destination")
const locationInput = document.getElementById("location")
const wishList = document.getElementById("myWishlist")
const h2OnList = document.querySelector("h2")
const defaultImage = 'images/defaultVacation.jpeg'


// function makeWishListCards(description, location, destination, photo){

//     // create card w/classes
//     const cardDiv = document.createElement('div')
//     cardDiv.className = 'col-4'

//     const card = document.createElement('div')
//     card.className = 'card mb-2 h-100'

//     const cardImage = document.createElement('img')
//     cardImage.className = 'card-img-top'

//     const cardBody = document.createElement('div')
//     cardBody.className = 'card-body'
    
//     const cardHeading = document.createElement('h5')
//     cardHeading.className = 'card-title'
//     cardHeading.setAttribute('id', 'cardHeading')

//     const cardSubhead = document.createElement('h6')
//     cardSubhead.className = 'card-title'
//     cardSubhead.setAttribute('id', 'cardSubhead')

//     const cardPara = document.createElement('p')
//     cardPara.className = 'card-text'

//     const buttonDiv = document.createElement('div')
//     buttonDiv.className = 'd-grid gap-3 d-md-block'

//     const editButton = document.createElement('button')
//     editButton.className = 'btn btn-warning btn-sm me-3'
//     editButton.setAttribute('id', 'editButton')

//     const removeButton = document.createElement('button')
//     removeButton.className = 'btn btn-danger btn-sm'
//     removeButton.setAttribute('id', 'removeButton')

//     //add values to card
//     photo ? cardImage.src = photo : cardImage.src = defaultImage
//     cardHeading.innerText = destination
//     cardSubhead.innerText = location
//     cardPara.innerText = description
//     editButton.innerText = 'Edit'
//     removeButton.innerText = 'Remove'

//     //append values to show in dom
//     wishList.appendChild(cardDiv)
//     cardDiv.appendChild(card)
//     card.appendChild(cardImage)
//     card.appendChild(cardBody)
//     cardBody.appendChild(cardHeading)
//     cardBody.appendChild(cardSubhead)
//     cardBody.appendChild(cardPara)
//     cardBody.appendChild(buttonDiv)
//     buttonDiv.appendChild(editButton)
//     buttonDiv.appendChild(removeButton)

//     //change heading on list
//     h2OnList.innerText = 'My WishList'

//     //reset input fields
//     destinationInput.value = ''
//     locationInput.value = ''
//     descriptionInput.value = ''

// }

//Edit cards
// wishList.addEventListener('click', async function(e){
 
//     if(e.target.id === 'editButton'){
//         let editDestination = prompt("Enter new name")
//        if(editDestination) {e.target.parentNode.parentNode.childNodes[0].innerText = editDestination}

//        let editLocation = prompt('Enter new location')
//        if(editLocation) {e.target.parentNode.parentNode.childNodes[1].innerText = editLocation}

//        let editDescription = prompt('Enter new description')
//        if(editDescription) {e.target.parentNode.parentNode.childNodes[2].innerText = editDescription}
       
//         let editPhoto = await getVacationImage(editLocation, editDestination)
//         if(editPhoto) {e.target.parentNode.parentNode.parentNode.childNodes[0].src = editPhoto}
        
//     }
    
// })


wishList.addEventListener('click', (e) => {
    let cardObjectID

    console.log('js post request e.target',e.target.id)
    console.log('objectID text', e.target.parentNode.parentNode.parentNode.parentNode.id)
    console.log('destination text', e.target.parentNode.parentNode.childNodes)
    console.log('location text', e.target.parentNode.parentNode.childNodes[1].innerText)
    console.log('description text', e.target.parentNode.parentNode.childNodes[1].innerText)
    console.log('photo text', e.target.parentNode.parentNode.parentNode.childNodes)

    // fetch('/wishlist', {
    //     method: 'put', 
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
            
    //     })
    // })
    // .then(res => {
    //     if(res.ok) return res.json()
    // })
    // .then(response => {
    //     console.log(response)
    // })
    // .catch(error => {
    //     console.log(error)
    // })
})

//Remove cards
wishList.addEventListener('click', function(e){
    if(e.target.id === 'removeButton'){
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
    }

})

// document.querySelector('form').addEventListener('submit', getCardValues)


const addButton = document.getElementById("addItem")
const descriptionInput = document.getElementById("description")
const destinationInput = document.getElementById("destination")
const locationInput = document.getElementById("location")
const wishList = document.getElementById("myWishlist")
const h2OnList = document.querySelector("h2")
const defaultImage = 'images/defaultVacation.jpeg'
const authKey = config.ACCESS_API_KEY

async function getCardValues(e){
    e.preventDefault()

    let description = descriptionInput.value
    let location = locationInput.value
    let destination = destinationInput.value
    let photo = await getVacationImage(location, destination)

    makeWishListCards(description, location, destination, photo)
}

async function getVacationImage(location, destination){
    let locationEncode = encodeURIComponent(location)
    let destinationEncode = encodeURIComponent(destination)
    
    try {
        let response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${authKey}&query=${locationEncode,destinationEncode}&orientation=landscape`)
        let result = await response.json()
        imageURL = result.results[0].urls.thumb
        console.log(result) //demo
        return imageURL
        
    } catch (error) {
        console.log(`error: ${error}`)
    }
    
}

function makeWishListCards(description, location, destination, photo){

    // create card w/classes
    const cardDiv = document.createElement('div')
    cardDiv.className = 'col-4'

    const card = document.createElement('div')
    card.className = 'card mb-2 h-100'

    const cardImage = document.createElement('img')
    cardImage.className = 'card-img-top'

    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'
    
    const cardHeading = document.createElement('h5')
    cardHeading.className = 'card-title'
    cardHeading.setAttribute('id', 'cardHeading')

    const cardSubhead = document.createElement('h6')
    cardSubhead.className = 'card-title'
    cardSubhead.setAttribute('id', 'cardSubhead')

    const cardPara = document.createElement('p')
    cardPara.className = 'card-text'

    const buttonDiv = document.createElement('div')
    buttonDiv.className = 'd-grid gap-3 d-md-block'

    const editButton = document.createElement('button')
    editButton.className = 'btn btn-warning btn-sm me-3'
    editButton.setAttribute('id', 'editButton')

    const removeButton = document.createElement('button')
    removeButton.className = 'btn btn-danger btn-sm'
    removeButton.setAttribute('id', 'removeButton')

    //add values to card
    photo ? cardImage.src = photo : cardImage.src = defaultImage
    cardHeading.innerText = destination
    cardSubhead.innerText = location
    cardPara.innerText = description
    editButton.innerText = 'Edit'
    removeButton.innerText = 'Remove'

    //append values to show in dom
    wishList.appendChild(cardDiv)
    cardDiv.appendChild(card)
    card.appendChild(cardImage)
    card.appendChild(cardBody)
    cardBody.appendChild(cardHeading)
    cardBody.appendChild(cardSubhead)
    cardBody.appendChild(cardPara)
    cardBody.appendChild(buttonDiv)
    buttonDiv.appendChild(editButton)
    buttonDiv.appendChild(removeButton)

    //change heading on list
    h2OnList.innerText = 'My WishList'

    //reset input fields
    destinationInput.value = ''
    locationInput.value = ''
    descriptionInput.value = ''

}

//Edit cards
wishList.addEventListener('click', async function(e){
 
    if(e.target.id === 'editButton'){
        let editDestination = prompt("Enter new name")
       if(editDestination) {e.target.parentNode.parentNode.childNodes[0].innerText = editDestination}

       let editLocation = prompt('Enter new location')
       if(editLocation) {e.target.parentNode.parentNode.childNodes[1].innerText = editLocation}

       let editDescription = prompt('Enter new description')
       if(editDescription) {e.target.parentNode.parentNode.childNodes[2].innerText = editDescription}
       
        let editPhoto = await getVacationImage(editLocation, editDestination)
        if(editPhoto) {e.target.parentNode.parentNode.parentNode.childNodes[0].src = editPhoto}
        
    }
    
})

//Remove cards
wishList.addEventListener('click', function(e){
    if(e.target.id === 'removeButton'){
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
    }

})

document.querySelector('form').addEventListener('submit', getCardValues)

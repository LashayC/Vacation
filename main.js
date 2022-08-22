const addButton = document.getElementById("addItem")
const descriptionInput = document.getElementById("description")
const destinationInput = document.getElementById("destination")
const locationInput = document.getElementById("location")
const photoInput = document.getElementById("photo")
const wishList = document.getElementById("myWishlist")
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASyaCuEvNl3LRXjmwbhRiHbjBVKC-xH-CcQ&usqp=CAU'
//pull input from form
//append to card parts
//add bootstrap classes

function makeWishList(e){
    e.preventDefault()
    //get values from input
    let description = descriptionInput.value
    let location = locationInput.value
    let destination = destinationInput.value
    let photo = photoInput.value

    //create card w/classes
    const cardDiv = document.createElement('div')
    cardDiv.className = 'col-4 mx-1'

    const card = document.createElement('div')
    card.className = 'card'
    card.style.width = '18rem'

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
    photo == '' ? cardImage.src = defaultImage : cardImage.src = photo
    cardHeading.innerText = destination
    cardSubhead.innerText = location
    cardPara.innerText = description
    editButton.innerText = 'Edit'
    removeButton.innerText = 'Remove'

    //append valued to show in dom
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

    //reset input fields
    descriptionInput.value = ''
    locationInput.value = ''
    photoInput.value = ''
    descriptionInput.value = ''

}
const editButton = document.getElementById("editButton")

//Create edit button
//create pop up window
//for each field, pull value 
//replace fields in this box with new value


wishList.addEventListener('click', function(e){
    console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].src)
    // console.log(e.target.parentNode.parentNode) //Gives the card heading. childNodes = heading
    if(e.target.id == 'editButton'){
        let editDestination = prompt("Enter new name")
       if(editDestination != '') {e.target.parentNode.parentNode.childNodes[0].innerText = editDestination}

       let editLocation = prompt('Enter new location')
       if(editLocation != '') {e.target.parentNode.parentNode.childNodes[1].innerText = editLocation}

       let editPhoto = prompt('Enter new photo')
       if(editPhoto != '') {e.target.parentNode.parentNode.parentNode.childNodes[0].src}

       let editDescription = prompt('Enter new description')
       if(editDescription != '') {e.target.parentNode.parentNode.childNodes[2].innerText = editDescription}

    }
    
})


addButton.addEventListener('click', makeWishList)
// editButton.addEventListener('click', editWishList)
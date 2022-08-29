const addButton = document.getElementById("addItem")
const descriptionInput = document.getElementById("description")
const destinationInput = document.getElementById("destination")
const locationInput = document.getElementById("location")
let photo
const wishList = document.getElementById("myWishlist")
const h2OnList = document.querySelector("h2")
const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASyaCuEvNl3LRXjmwbhRiHbjBVKC-xH-CcQ&usqp=CAU'
// let unsplashImage

const authKey = 'nTmH_kB9w12-v2MpSH7uNeQiUHwVO0lU5Bs0qYM2Qn0'
// https://api.unsplash.com/search/photos/?client_id=nTmH_kB9w12-v2MpSH7uNeQiUHwVO0lU5Bs0qYM2Qn0&query=paris&per_page=20



async function getVacationImage(location, destination){

    

    try {
        let response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${authKey}&query=${location,destination}`)
        let result = await response.json()
        // console.log(result.results[0].links.html)
        imageURL = result.results[0].urls.regular
        console.log(imageURL)
        return imageURL
        // console.log(unsplashImage)
        // .then(result => {return result.json()})
        // .then(data => {
        //     // console.log(data)
        //     // console.log('da link for paree',data.results[0].links.html)
        // //    unsplashImage = data.results[0].links.html   
        // //    return unsplashImage 
        // data.results[0].links.html 
        //     // console.log('da link for paree', unsplashImage)
        // })
        // // return console.log(unsplashImage)
        // makeWishList(photo, description, location, destination)
    } catch (error) {
            console.log(`error: ${error}`)
    }
    

}






// function getInput(e){
//     e.preventDefault()
//     let description = descriptionInput.value
//     let location = locationInput.value
//     let destination = destinationInput.value
//     makeWishList(null, description, location, destination)

// }

//pull input from form
//append to card parts
//add bootstrap classes
async function makeWishList(e){
    e.preventDefault()
    // get values from input
    let description = descriptionInput.value
    let location = locationInput.value
    let destination = destinationInput.value
    // console.log(photoInput)
    // let thisPic = getVacationImage(location, destination)
//    console.log('the callback func', thisPic.)

// function getVacationImage(location, destination){

//     fetch(`https://api.unsplash.com/search/photos/?client_id=${authKey}&query=${location,destination}`, {
//         method: 'GET',
//         headers: {
//             'Accept-Version' : 'v1',
//             // 'Authorization' : authKey
//         }
//     })
//     .then(result => {return result.json()})
//     .then(data => {
//      data.results[0].links.html 
//     })
//     .catch(error =>{
//         console.log(`error: ${error}`)
//     })
// }



photo = await getVacationImage(location, destination)

console.log('this be it??', photo)



    // getVacationImage(location, destination)
    // create card w/classes
    const cardDiv = document.createElement('div')
    cardDiv.className = 'col-4'

    const card = document.createElement('div')
    card.className = 'card mb-2'

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
    // cardImage.src = defaultImage
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
    // photoInput.value = ''
    descriptionInput.value = ''

}



//Create edit button
//create pop up window
//for each field, pull value 
//replace fields in this box with new value
wishList.addEventListener('click', function(e){
 
    if(e.target.id == 'editButton'){
        let editDestination = prompt("Enter new name")
       if(editDestination) {e.target.parentNode.parentNode.childNodes[0].innerText = editDestination}
    //    editDestination ? e.target.parentNode.parentNode.childNodes[0].innerText = editDestination : null

       let editLocation = prompt('Enter new location')
       if(editLocation) {e.target.parentNode.parentNode.childNodes[1].innerText = editLocation}

       let editPhoto = prompt('Enter new photo')
       if(editPhoto) {e.target.parentNode.parentNode.parentNode.childNodes[0].src = editPhoto}

       let editDescription = prompt('Enter new description')
       if(editDescription) {e.target.parentNode.parentNode.childNodes[2].innerText = editDescription}

    }
    
})

//Create remove button
//target card
//remove it
wishList.addEventListener('click', function(e){
    if(e.target.id == 'removeButton'){
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
    }

})


document.querySelector('form').addEventListener('submit', makeWishList)

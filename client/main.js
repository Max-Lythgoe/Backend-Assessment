const memesContainer = document.querySelector('#memes-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/memes`

const memesCallback = ({ data: memes }) => displayMemes(memes)
const errCallback = err => console.log(err)

const getAllMemes = () => axios.get(baseURL).then(memesCallback).catch(errCallback)
const createMeme = body => axios.post(baseURL, body).then(memesCallback).catch(errCallback)
const deleteMeme = id => axios.delete(`${baseURL}/${id}`).then(memesCallback).catch(errCallback)
const updateMeme = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(memesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let caption = document.querySelector('#caption')
    let rating = document.querySelector('#rating')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        caption: caption.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createMeme(bodyObj)

    caption.value = ''
    rating.value = ''
    imageURL.value = ''
}

function createMemeCard(meme) {
    const memeCard = document.createElement('div')
    memeCard.classList.add('meme-card')

    memeCard.innerHTML = `
    <p class="caption"><strong>${meme.caption}</strong></p>
    <br>
    <img alt='meme image' src=${meme.imageURL} class="meme-image"/>
    <div class="btns-container">
        <button id="control-buttons" onclick="updateMeme(${meme.id}, 'minus')">-</button>
        <p class="meme-rating">${meme.rating} / 5 ⭐</p>
        <button id="control-buttons" onclick="updateMeme(${meme.id}, 'plus')">+</button>
    </div>
    <button id="delete-style" onclick="deleteMeme(${meme.id})">DELETE</button>
    `


    memesContainer.appendChild(memeCard)
}

function displayMemes(arr) {
    memesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createMemeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllMemes()
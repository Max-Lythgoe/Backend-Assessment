const res = require('express/lib/response')
const memes = require('./db.json')
let globalID = 6

module.exports = {
    getAllMemes: (req, res) => {
        res.status(200).send(memes)
    },

    createMeme: (req, res) => {
        let { caption, rating, imageURL } = req.body
        
        let newMeme = {
            id: globalID,
            caption, 
            rating, 
            imageURL
        }

        if (rating > 5) {
            alert('Rating must be between 1-5 stars')
        } else if (rating < 1) {
            alert('Rating must be between 1-5 stars')
        } else if (imageURL === ' ') {
            alert('must enter URL')
        } else if (caption === ' ') {
            alert('must enter caption')
        } else {
        memes.push(newMeme)
        res.status(200).send(memes)
        globalID ++
        }
    },

    deleteMeme: (req, res) => {
        let index = memes.findIndex(meme => meme.id === +req.params.id)
        memes.splice(index, 1)
        res.status(200).send(memes)
    },

    updateMeme: (req, res) => {
        let { id } = req.params
        let { type } = req.body

        let index = memes.findIndex(meme => meme.id === +id)
        
        if (memes[index].rating === 1 && type === 'minus') {
            res.status(400).send(memes)
        } else if (memes[index].rating === 5 && type === 'plus') {
            res.status(400).send(memes)
        } else if (type === 'plus') {
            (memes[index].rating++)
            res.status(200).send(memes)
        } else if (type === 'minus') {
            (memes[index].rating--)
            res.status(200).send(memes)
        } else {
            res.status(400)
        }
    },

    randomCompliment: (req, res) => {
        const compliments = ["You look great",
            "You are a javascript pro",
            "Your website looks awesome",
            "Your breath smells really good",
            "I love the way you slouch",
            "That t-shirt looks really great, but only when you wear it on tuesdays",
            "You have beautiful eyelashes",
            "I've never seen eyes like yours, they are a really unique color! Then again, I can't actually see you since I'm just a website."
        ];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
        
    },

    randomFortune: (req, res) => {
        const fortunes = ["I forsee large amounts of coding in your future",
            "Your code will not work unexpectedly in the future",
            "You are lucky",
            "All will go well with your new project.",
            "A smooth long journey! Great expectations.",
            "All your hard work will soon pay off."
        ];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
        
    }

}
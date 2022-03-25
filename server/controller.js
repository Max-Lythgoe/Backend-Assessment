const res = require('express/lib/response')
const memes = require('./db.json')
let globalID = 4

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
        memes.push(newMeme)
        res.status(200).send(memes)
        globalID ++
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
            res.status(200).send(memes)
        } else if (memes[index].rating === 5 && type === 'plus') {
            res.status(200).send(memes)
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
        const compliments = ["Guy looking back at girl meme",
            "Drake approval meme",
            "Avengers Endgame meme",
        ];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
        
      }

}
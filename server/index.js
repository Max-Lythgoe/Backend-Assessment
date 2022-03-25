const express = require("express");
const cors = require("cors");

const { getAllMemes, createMeme, deleteMeme, updateMeme, randomCompliment, randomFortune } = require('./controller')


const app = express();


app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", randomCompliment)
app.get("/api/fortune", randomFortune)

app.get('/api/memes', getAllMemes)
app.post('/api/memes', createMeme)
app.delete('/api/memes/:id', deleteMeme)
app.put('/api/memes/:id', updateMeme)

app.listen(4000, () => console.log("Server running on 4000"));

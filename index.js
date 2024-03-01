//Deliverabilities
//URL : http://vidly.com/api/genres
//Vidly app backend
//Manage list of genres
//Get all genres √
//Create a genre √
//Update a genre
//Delete a genre

const Joi = require('joi')
const express = require('express')
const app = express()
app.use(express.json())

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})

const genres = [
    {id:1, genre:"genre1"},
    {id:2, genre:"genre2"},
    {id:3, genre:"genre3"}
]

app.get('/', (req, res) => {
    res.send('Welcome to Vidly App')
})

app.get('/api/movies/genres', (req, res) => {
    res.send(genres)
})
app.get('/api/movies/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send("Genre could not be found")
    res.send(genre)
})

app.post('/api/movies/genres', (req, res) => {
    const {error} = validateGenre(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }

    const genre = {
        id:genres.length + 1,
        genre:req.body.genre
    }

    genres.push(genre)
    res.send(genre)
})

app.put('/api/movies/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Genre could not be found.')
    const {error, value}= validateGenre(req.body)
    if(error){
        return res.status(422).send(error.details[0].message)
    } 
    genre.genre = value.genre
    res.send({genre:genre, message:'Successfully updated genre.'})
})

function validateGenre(genre){
    const schema = Joi.object({
        genre:Joi.string().min(3).required()
    })

    return schema.validate(genre)
}

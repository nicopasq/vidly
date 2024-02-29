//Deliverabilities
//URL : http://vidly.com/api/genres
//Vidly app backend
//Manage list of genres
//Get all genres √
//Create a genre
//Update a genre
//Delete a genre


const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const movies = [
    {id:1, name:"movie1"},
    {id:2, name:"movie2"},
    {id:3, name:"movie3"}
]

app.get('/', (req, res) => {
    res.send('Welcome to Vidly App')
})

app.get('/api/movies', (req, res) => {
    res.send(movies)
})
app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie) return res.status(404).send("Movie could not be found")
    res.send(movie)
})

app.post('/api/movies', (req, res) => {
    const movie = {
        id:movies.length + 1,
        name:req.body.name
    }
})

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}...`)
})
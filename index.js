const express = require('express')
const app = express()

const port = process.env.PORT || 3000

const movies = [
    {id:1, name:"movie1"},
    {id:2, name:"movie2"},
    {id:3, name:"movie3"}
]

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/api/movies', (req, res) => {
    res.send(movies)
})

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}...`)
})
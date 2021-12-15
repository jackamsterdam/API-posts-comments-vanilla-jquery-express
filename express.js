const express = require('express')
const path = require('path')
const fs = require('fs')

const memberPosts = require('./postmembers')
const memberComments = require('./commentsMembers')

const app = express()
    //body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.get('/', (req, res) => {
    let fullFileName = path.join(__dirname, './express-index.html')
    fs.readFile(fullFileName, 'utf-8', (err, htmlPage) => {
        res.send(htmlPage)
    })
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/" + "./style.css")
})

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + "/" + "./app.js")
})


app.get('/posts', (req, res) => {

    res.json(memberPosts)
})

//regina does this cause sholimit told her
app.get('/hello', (req, res) => {

    res.json('Test works!')
})

app.get('/posts/:id/comments', (req, res) => {

    let found = memberComments.some(comment => comment.postId === +req.params.id)
    if (found) {
        comments = memberComments.filter(comment => comment.postId === +req.params.id)
        console.log("comments", comments);
        res.json(comments)
    }

})


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on Port ${PORT}`))
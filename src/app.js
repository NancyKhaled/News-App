// requier the express framwork
const express = require('express')
const app = express()

// load in localhost or spacific port 
const port = process.env.PORT || 3000

// the project see public folder
const path = require('path')
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

// Template engine hbs (html + dyncamic features)
app.set('view engine', 'hbs');
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

const newsapi = require('./tools/newsapi')
app.get('/', (req, res) => {
    newsapi((error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            res.render('index', {
                art: data
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'page not found',
        name: '404 error'
    })
})


// localhost:3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
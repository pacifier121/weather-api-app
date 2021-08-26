const path = require('path');
const hbs = require('hbs');
const express = require('express');
const forecast = require('./forecast');

const app = express();
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render("index", {
        title: "Welcome to the weather app",
        description: "Gives you information about the weather of any location you want."
    });
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: "About weather app",
        description: "About weather app, this is cool"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: "help about weather app",
        description: "Need help about weather app? you can find here."
    })
})

app.get('/weather', (req, res) => {
    let location = req.query.location;
    if (!location) {
        return res.send({
            error: "Please provide an address"
        })
    }
    forecast(location, (err, details) => {
        res.send(details);
    })
})

app.get('/games', (req, res) => {
    let query = req.query;
    if (!query.search) {
        return res.send({
            error: "No search term given."
        })
    }
    console.log(query);
    res.send({
        games: []
    })
})

app.get('*', (req, res) => {
    res.render("404");
})


let port = 3000;
app.listen(port, () => {
    console.log("Server started on port " + port);
})
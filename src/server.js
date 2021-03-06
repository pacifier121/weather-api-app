const path = require('path');
const hbs = require('hbs');
const express = require('express');

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
    res.render("about")
})

app.get('/help', (req, res) => {
    res.render("help")
})


app.get('*', (req, res) => {
    res.render("404");
})


let port = 3000;
app.listen(port, () => {
    console.log("Server started on port " + port);
})
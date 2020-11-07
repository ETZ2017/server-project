const connection = require("./models");
import express from 'express';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
const __dirname = path.resolve();

const ArtistController = require("./controllers/artist")

const PORT = 3001;
const application = express();

application.use(bodyParser.urlencoded({
    extended: true
}));

application.use(bodyParser.json())

const hbs = expressHandlebars.create({
    defaultLayout: 'mainLayout', 
    extname: 'hbs',
  });


application.set('views', path.join('views'));
application.engine("hbs", expressHandlebars({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts"
}));

application.set('view engine', 'hbs')

// application.get('/', (req, res) => {
//     // res.send("<h1>Hello world</h1>")
//     res.render("index", {})
// });

application.use("/artist", ArtistController);

application.listen(PORT, () => {
    //  console.log(buildUrl('v1', 'items'));
    console.log(`Server has been started on port ${PORT}`);  //  другие КАВЫКИ!!!!!!!!!!
});
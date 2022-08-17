const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers')
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload')
const hbs = exphbs.create({ helpers });

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//default option for fileupload
app.use(fileUpload())
    //parameters for docuemntation check later))

// app.get('', (req, res) => {
//     res.render('dashboard')
// })

// app.post('dashboard', (req, res) => {
//     let sampleFile
//     let uploadPath

//     if(!req.files || Objest.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.')
//     }

//     sampleFile = req.files.sampleFile
//     console.log(sampleFile)

//     sampleFile = req.files.sampleFile
//     uploadPath =__dirname +'/upload' + sampleFile.name

//     sampleFile.mv(uploadPath, function(err) {
//         if(err) return res.status(500).send(err)
//     })
// })


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
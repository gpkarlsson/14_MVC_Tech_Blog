//Install Dependencies
//Define routes (ex. homepage, viewing specific post, creating post, editing existing post)
//Create handlebars views
//Server side logic - handling requests, rendering views, interacting with DB
//Set up Database - create necessary connections
//Test

const express = require('express');
const handlebars = require('express-handlebars');
const helpers = require('./utils/helpers');
const path =  require('path');
const session = require('express-session')
const app = express();
const PORT = process.env.port || 3001;
const controllers = require('./controllers')
const sequelize = require('./config/connection');

const sess = {
    secret: 'Secret Key',
    cookie: {

    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
  };

  app.use(session(sess));

const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
});
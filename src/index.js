const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const app = express();
const port = 3000;

const route = require('./routes');
const  db = require('./config/db');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

// connetc db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));


//Custom middlewares 
app.use(SortMiddleware);

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// http logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType];
                const type = types[sortType];
    
                return `<a href="?_sort&column=${field}&type=${type}">
                <span class="${icon}"></span>
                </a>`
            }
        },
       
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

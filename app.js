const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dataRoutes = require('./routes');


const app = express();
// Development Logging:
app.use(morgan('dev'));

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    express.json({
        limit: '10kb',
    })
);


app.use('/', dataRoutes)

// const port = process.env.PORT || 4000;

app.listen(process.env.PORT || 4000, () => {
    console.log(`
        App listening on port 4000!`);
});
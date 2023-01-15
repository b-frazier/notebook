const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

app.listen(PORT, () =>
    console.log(`View at http://localhost:${PORT}`)
);
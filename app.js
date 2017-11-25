const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
// const bodyParser = require('body-parser');
const multer = require('multer');

let upload = multer({
	dest: `${__dirname}/uploads`
});

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/pokedex');

require('./models/Pokemon');
require('./models/Type');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// app.use(bodyParser.urlencoded());
app.use(upload.single('file'));

app.use('/uploads', express.static(`${__dirname}/uploads`));
app.use('/css', express.static(`${__dirname}/node_modules/bootstrap/dist/css`));

app.use('/', require('./routes/pokemon'));
app.use('/types', require('./routes/type'));

app.listen(port, () => {
  console.log(`Pokedex lancé sur le port ${port}`);
});

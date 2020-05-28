const express = require('express');
const expressStaticGzip = require('express-static-gzip');

const path = require('path');
app = express();
app.use(expressStaticGzip(path.join(__dirname, 'dist'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
 }));
app.get(/.*/, (req, res) => {
    res.redirect('/');
})
const port = process.env.PORT || 3000;
app.listen(port);
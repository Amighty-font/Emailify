const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});


const PORT = process.env.PORT || 5000; 
//grabs port from the Heroku environment or if none -> 5000
app.listen(PORT);


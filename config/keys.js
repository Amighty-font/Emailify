//keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    //in production
    module.exports = require('./prod');
} else {
    //in dev
    module.exports = require('./dev');
}

var emailify = {
    username: 'emailify-prod',
    password: 'HBdiA75:rk3cACN',
    connectLink: 'mongodb+srv://emailify-prod:<password>@cluster0.x4rib.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}
const session = require('express-session');

const appSession = session({
    secret: 'RSA-zzz',
    name: 'login-session',
    store: new session.MemoryStore(),
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
})

module.exports = appSession;
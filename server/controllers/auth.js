const g5Auth = require('@getg5/g5-auth');

const authConfig = {
  passport: {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/users/auth/auth0/callback'
  },
  session: {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
  },
  defaultRedirectPath: '/',
  authenticate: {
    scope: 'openid email profile',
    audience: `https://${process.env.AUTH0_DOMAIN}/userinfo`
  }
};

const regexWhitelist = [
  /\/report$/,
  /\/api\/v1\/reports\/display\/\S*$/,
  /\/api\/v1\/reports\/\S*$/,
  /\/[0-9a-z-]*\.png/,
  /\/[0-9a-z-]*\.ico/,
  /\/[~./0-9a-z-]*\.js/
];

function dynamicWhitelist (path) {
  return regexWhitelist.some(url => url.test(path))
}

function checkWhiteList (req, res, next) {
  if (dynamicWhitelist(req.path)) {
    next()
  } else {
    g5Auth.secured(req, res, next)
  }
}

module.exports = (app) => {
  g5Auth.init(app, authConfig);
  app.use(checkWhiteList);
}
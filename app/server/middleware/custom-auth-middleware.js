const { User, AuthToken } = require('../models');

module.exports = async function(req, res, next) {

  // looking for an authorization header or auth_token in the cookies
  const token =
    req.cookies.auth_token || req.headers.authorization;

  // if a token is found, find it's associated user which if found is then attached to the req object so any
  // following middleware or routing logic will have access to the authenticated user.
  if (token) {
    
    // look for an auth token that matches the cookie or header
    const authToken = await AuthToken.find(
      { where: { token }, include: User }
    );

    // if there is an auth token found, its associated
    // user is attached to the req object to be used in the routes
    if (authToken) {
      req.user = authToken.User;
    }
  }
  next();
}
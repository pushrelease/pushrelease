'use strict';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

module.exports = function (req, res, next) {
  if (req.method === 'GET' && req.url === '/auth/github') {
    let url = '/auth/github/index.html';

    if (GITHUB_TOKEN) {
      url += `?token=${GITHUB_TOKEN}`;
    }

    res.redirect(url);
  } else {
    next();
  }
};

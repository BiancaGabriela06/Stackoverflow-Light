const express = require('express');
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require("express-openid-connect");
const { randomBytes } = require("crypto");
const routes = require("./routes/auth-routes");

require('dotenv').config()

const app = express();
const port = process.env.PORT;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret:  process.env.SESSION_SECRET || randomBytes(64).toString('hex'),
  baseURL: process.env.AUTH_SERVICE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  session: {
    rolling: true,
    absoluteDuration: 3600, 
  },

}
app.use(auth(config));

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
});

app.use('/', routes);

// app.get("/", requiresAuth(), (req, res) => {
//   req.oidc.fetchUserInfo().then((userInfo) => {
//     res.send(
//       `<html lang='en'><body><pre><code>${JSON.stringify(
//         {
//           accessToken: req.oidc.accessToken,
//           refreshToken: req.oidc.refreshToken,
//           idToken: req.oidc.idToken,
//           idTokenClaims: req.oidc.idTokenClaims,
//           userInfo,
//         },
//         null,
//         2,
//       )}</code></pre></body></html>`,
//     );
//   });
// });

app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});

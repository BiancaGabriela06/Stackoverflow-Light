const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { auth, requiresAuth } = require("express-openid-connect");
const { randomBytes } = require("crypto");
const https = require('https');
const routes = require("./routes/auth-routes");
const fs = require('fs');

require('dotenv').config()

const port = process.env.PORT;

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.url);
  next();
});

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret:  process.env.SESSION_SECRET || randomBytes(64).toString("hex"),
//   baseURL: process.env.AUTH_SERVICE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
//   issuerBaseURL: process.env.AUTH0_BASE_URL
// }
// app.use(auth(config));

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

// Make sure you have a router defined or remove this line if not needed
// app.use('/', router);



app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});

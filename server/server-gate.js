const userdb = __dirname + '/gate-users.json';

const serverHandler = new Promise((resolve, reject) => {
  // require gateserver
  const {TGateServerAuth} = require('gateserverauth');
  // create server instance
  const server = new TGateServerAuth;
  // load module definition
  server.Modules = {
    "mock-test": {
      "host": "http://localhost:3000"
    }
  };
  // define auth key
  server.authKey = 'ang5test';

  const fs = require('fs');
  if (fs.existsSync(userdb)) {
    server.GateAuth.loadFromFile(userdb);
  }

  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
      'X-Requested-With,Content-Type, authkey, authtool, authtoken, authid, modname');
    res.setHeader('Content-Type', 'application/json');
    if (req.method == 'OPTIONS') {
      res.end();
    } else {
      next();
    }
  });


  // event on user add
  server.GateAuth.OnUserAdd = (id, user) => {
    // console.log('Saving user ' + user.userlogin);
    server.GateAuth.saveToFile(userdb);
  };

  // event on user change
  server.GateAuth.OnUserChange = (id, user) => {
    setTimeout(() => {
      // console.log('Saving changes for user ' + user.userlogin);
      server.GateAuth.saveToFile(userdb);
    }, 500);
  };

  // start server on port 8080
  server.listen(8080, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(server);
    }
  });
});

module.exports = serverHandler;
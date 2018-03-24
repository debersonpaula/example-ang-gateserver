const server_api = require('./server-api');
const server_gate = require('./server-gate');

server_api.then( () => {
	console.log('API Server Running');
	server_gate.then(()=>{
		console.log('Gateway Server Running');
	})
});
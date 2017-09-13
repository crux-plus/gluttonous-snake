// Fast, unopinionated, minimalist web framework for node.
import express from 'express';

// Authority node http serer package.
import http from 'http';

// Realtime application framework (Node.JS server)
import socketIO from 'socket.io';

// This is an Express view engine which renders React components on server.
// It renders static markup and *does not* support mounting those views
// on the client.
import { createEngine } from 'express-react-views';

const app = express();

// set the engine
app.engine('.jsx', engine);

// set the view directory
app.set('views', __dirname + '/views');

// set jsx or js as the view engine
// (without this you would need to supply the extension to res.render())
// ex: res.render('index.jsx') instead of just res.render('index').
app.set('view engine', 'jsx');

// finally, set the custom view
app.engine('jsx', createEngine());

const server = http.createServer(app);

const io = socketIO(server);

app.get('/', (req, res) => {
  // ...
});

io.on('connection', (socket) => {
  // ...
});

server.listen(3000);
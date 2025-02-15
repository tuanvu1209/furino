import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import checkToken from './authentication/auth';
import connect from './database/database';

import { relationship } from './models/relationship';
import {
  categoriesRouter,
  orderRouter,
  productsRouter,
  usersRouter,
} from './routes/index';

dotenv.config();
export const userSockets = new Map();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const port = process.env.PORT ?? 3001;

relationship();

app.use(cors());

// Other middleware
app.use(checkToken);
app.use(express.json());

// Routes
app.use('/admin/products', productsRouter);
app.use('/admin/categories', categoriesRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/orders', orderRouter);

app.options('/admin/products', (req, res) => {
  res.header(
    'Access-Control-Allow-Methods',
    'PUT, GET, HEAD, POST, DELETE, OPTIONS, PATCH'
  );
  res.status(200).end();
});

// Default route
app.get('/admin', (req, res) => {
  res.send('response from root router admin');
});

server.listen(port, async () => {
  await connect();
  console.log(`listening on port: ${port}`);
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('register', (userId) => {
    const userSocketIds = userSockets.get(userId) || [];
    userSocketIds.push(socket.id);
    userSockets.set(userId, userSocketIds);
    console.log(userSockets);
  });

  socket.on('orderInsert', (data) => {
    console.log(data);
    
    io.emit('orderInsert', {});
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    for (const [userId, socketIds] of userSockets.entries()) {
      const index = socketIds.indexOf(socket.id);
      if (index !== -1) {
        socketIds.splice(index, 1);
        if (socketIds.length === 0) {
          userSockets.delete(userId);
        } else {
          userSockets.set(userId, socketIds);
        }
        break;
      }
    }
    console.log(userSockets);
  });
});

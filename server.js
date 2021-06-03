import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('success') })
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', handleRegister(db, bcrypt))
app.get('/profile/:id', handleProfileGet(db))
app.put('/image', handleImage(db))
app.post('/imageurl', handleApiCall())

app.listen(3000, () => {
	console.log('app is running on port 3000');
})
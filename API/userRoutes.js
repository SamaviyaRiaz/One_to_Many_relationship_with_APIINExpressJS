const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM Users', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get a specific user
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('SELECT * FROM Users WHERE id = ?', userId, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Create a user
app.post('/users', (req, res) => {
  const user = req.body;
  connection.query('INSERT INTO Users SET ?', user, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = req.body;
  connection.query('UPDATE Users SET ? WHERE id = ?', [user, userId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  connection.query('DELETE FROM Users WHERE id = ?', userId, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get all posts of a user
app.get('/users/:user_id/posts', (req, res) => {
  const userId = req.params.user_id;
  connection.query('SELECT * FROM Posts WHERE user_id = ?', userId, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Get a specific post of a user
app.get('/users/:user_id/posts/:post_id', (req, res) => {
  const userId = req.params.user_id;
  const postId = req.params.post_id;
  connection.query('SELECT * FROM Posts WHERE user_id = ? AND id = ?', [userId, postId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Create a post for a user
app.post('/users/:user_id/posts', (req, res) => {
  const userId = req.params.user_id;
  const post = req.body;
  post.user_id = userId;
  connection.query('INSERT INTO Posts SET ?', post, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a post of a user
app.put('/users/:user_id/posts/:post_id', (req, res) => {
  const userId = req.params.user_id;
  const postId = req.params.post_id;
  const post = req.body;
  connection.query('UPDATE Posts SET ? WHERE user_id = ? AND id = ?', [post, userId, postId], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Delete a post of a user
app.delete('/users/:user_id/posts/:')
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'password', // Your MySQL password
  database: 'School'
});

// Connect
db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err);
    return;
  }
  console.log('MySQL Connected...');
});

// Middleware
app.use(bodyParser.json());

// Routes
// Get all Home
app.get('/Home', (req, res) => {
  let sql = 'SELECT * FROM Class';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Get a specific Class
app.get('/Home/:id', (req, res) => {
  let sql = `SELECT * FROM Class WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Add a new todo
app.post('/Home', (req, res) => {
  let todo = req.body;
  let sql = `INSERT INTO Class (strength, section) VALUES ('${todo.strength}', ${todo.section})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Entry added successfully');
  });
});

// Update a todo
app.put('/Home/:id', (req, res) => {
  let todo = req.body;
  let sql = `UPDATE Class SET strength = '${todo.strength}', section = ${todo.section} WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Todo updated successfully');
  });
});

// Delete a todo
app.delete('/Home/:id', (req, res) => {
  let sql = `DELETE FROM Class WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Todo deleted successfully');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
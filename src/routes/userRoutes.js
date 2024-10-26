const express = require('express');
const router = express.Router();
const db = require('../config/firebase'); // Mengimpor koneksi Firebase

// Route POST untuk menambahkan user baru
router.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Name, email, dan password harus diisi' });
  }

  db.ref('users').push({
    nama: name,
    email: email,
    password: password
  })
    .then(() => {
      res.status(201).send({ message: 'User berhasil ditambahkan!' });
    })
    .catch((error) => {
      console.error('Error adding user: ', error);
      res.status(500).send({ error: 'Error adding user: ' + error.message });
    });
});

// Route GET untuk menampilkan semua user
router.get('/users', (req, res) => {
  db.ref('users').orderByChild('createdAt').limitToLast(10).once('value') // Mengambil 10 pengguna terbaru
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        return res.status(200).json(users);
      } else {
        return res.status(404).send({ message: 'No users found in the database' });
      }
    })
    .catch((error) => {
      console.error('Error fetching users: ', error);
      res.status(500).send({ error: 'Error fetching users: ' + error.message });
    });
});

module.exports = router;

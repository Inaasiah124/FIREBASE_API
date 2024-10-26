const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-service-account.json'); // Pastikan path ini benar

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fir-51861-default-rtdb.firebaseio.com' // Ganti dengan URL Firebase Database Anda
});

const db = admin.database();

module.exports = db;
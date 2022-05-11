const router = require('express').Router();
const { ufa_payment_type } = require('../controllers');

// GET localhost:8080/ufa_payment_type => Ambil data semua ufa_payment_type
router.get('/ufa_payment_type', ufa_payment_type.getDataUfa_payment_type);

// GET localhost:8080/ufa_payment_type/2 => Ambil data semua ufa_payment_type berdasarkan id = 2
router.get('/ufa_payment_type/:id', ufa_payment_type.getDataUfa_payment_typeByID);

// POST localhost:8080/ufa_payment_type/add => Tambah data ufa_payment_type ke database
router.post('/ufa_payment_type/add', ufa_payment_type.addDataUfa_payment_type);

// POST localhost:8080/ufa_payment_type/2 => Edit data ufa_payment_type
router.post('/ufa_payment_type/edit', ufa_payment_type.editDataUfa_payment_type);

// POST localhost:8080/ufa_payment_type/delete => Delete data ufa_payment_type
router.post('/ufa_payment_type/delete/', ufa_payment_type.deleteDataUfa_payment_type);

module.exports = router;